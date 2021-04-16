import React, { useState } from 'react';
import axiosInstance from '../../axios/login';
import { useHistory } from 'react-router-dom';
import FbLogin from 'react-facebook-login';
import './loginStyle.css';
import logo from '../pictures/logo.jpg';
import axios from 'axios';



export default function SignIn() {

	const history = useHistory();
	const initialFormData = Object.freeze({
		email: '',
		password: '',
	});

	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		axiosInstance
			.post(`auth/token/`, {
				grant_type: 'password',
				username: formData.email,
				password: formData.password,
				client_id: 'ncCVkzczoHNB2NdvtE7ExU4vQhC3cmA3lSBMa18A',
				client_secret:
					'qKBaC1n9iRrv3TCSGeVqkmzb2AxIbGd4MWX7XMTT9LBiH4p3CEzzn6z67BpUWH4IOgU5A3kA8McOvN8iUEOWhtid7ZTz8umphcI0SNlr72uS0CDaORnACVx7IZCdgDYh',
			})
			.then((res) => {
				localStorage.setItem('access_token', res.data.access_token);
				localStorage.setItem('refresh_token', res.data.refresh_token);
				history.push('/');
				window.location.reload();
			});
	};


	const responseFacebook = async (response) => {
		let accesstoken = response.accessToken;
		axios
			.post('http://127.0.0.1:8000/auth/convert-token', {
				token: accesstoken,
				backend: 'facebook',
				grant_type: 'convert_token',
				client_id: 'ncCVkzczoHNB2NdvtE7ExU4vQhC3cmA3lSBMa18A',
				client_secret:
					'qKBaC1n9iRrv3TCSGeVqkmzb2AxIbGd4MWX7XMTT9LBiH4p3CEzzn6z67BpUWH4IOgU5A3kA8McOvN8iUEOWhtid7ZTz8umphcI0SNlr72uS0CDaORnACVx7IZCdgDYh',
			})
			.then((res) => {
				localStorage.setItem('access_token', res.data.access_token);
				localStorage.setItem('refresh_token', res.data.refresh_token);
				history.push('/');
			    window.location.reload();
			});
	};

	return (
		<div class="intro__content">
      		<div class="container--t">
			  	<div class="intro__inner">
					<img class="img__logo" src={logo}/>
					<div class="log_sign_in">
						<div class="login__frame">
							<h1 class="name__title">
								INSTAGRAM
			          		</h1>
							<form class="ask__form">
								<input type="text" size="30" name="email" onChange={handleChange} placeholder="Email" class="ask__field"/>
								<input type="password" name="password" size="30" onChange={handleChange} placeholder="Password" class="ask__field"></input>
								<input class="ask__button" type="submit" onClick={handleSubmit} value="LOG IN"></input>
							</form>
							{/* <hr class="dividing__line"></hr> */}
							<a class="ref__forgotPassword" href="#">Forgot password?</a>
							<div class="social_login">
								<FbLogin
									appId="4017970454948303"
									fields="name,email,picture"
									callback={responseFacebook}
									cssClass="btn__Facebooklogin"
									textButton="f"
								/>
							</div>
						</div>
						<div class="createAccount__frame">
							<h5 class="title__createAcc">Don't have an account?</h5>
							<a class="ref__signUp" href="/register">Sign Up</a>
						</div>	
					</div>
				</div>
			</div>
    	</div>
		
	);
}
