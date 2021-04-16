import React from 'react';
import {useState} from 'react';
import axiosInstance from '../../axios';
import { useSelector, useDispatch } from 'react-redux';
//MaterialUI
import CardMedia from '@material-ui/core/CardMedia';

import { setUserData } from '../../redux/actions/userData.js'
import { setAuthenticated } from '../../redux/actions/userProfile.js'

export default function UserProfile() {

    const dispatch = useDispatch()
    const user  = useSelector(state => state.user)


    
    React.useEffect(() => {
        let formData = new FormData();
        formData.append('access_token', localStorage.getItem('access_token'));
        formData.append('refresh_token', localStorage.getItem('refresh_token'));

        
		axiosInstance.get('user/profile/', formData).then((res) => {
            const dataToSet = res.data;
            dispatch(setUserData(dataToSet));
		});
	}, []);

    return (
        <div>
            <div>
                {user.username}
            </div>
            <CardMedia
                image={user.image}
                title="Image title"
            />
            <img src={user.image} />
        
        </div>
    )
}