import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import axiosInstance from '../../axios/login';



import { setAuthenticated } from '../../redux/actions/userProfile.js'
import { setUserData } from '../../redux/actions/userData.js'

const useStyles = makeStyles((theme) => ({
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	toolbarTitle: {
		flexGrow: 1,
	},
}));


function Header() {

	const dispatch = useDispatch()
	const isAuth = useSelector(state => state.user.isAuth)

	React.useEffect(() => {
		if (localStorage.getItem("access_token") !== null) 
		{
			dispatch(setAuthenticated(true))
		}

	}, [localStorage.getItem("access_token")])


	function onClickLogOut() {
		dispatch(setAuthenticated(false))
	}

	const classes = useStyles();
	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar
				position="static"
				color="default"
				elevation={0}
				className={classes.appBar}
			>
				<Toolbar className={classes.toolbar}>
					<Typography
						variant="h6"
						color="inherit"
						noWrap
						className={classes.toolbarTitle}
					>
						<Link
							component={NavLink}
							to="/"
							underline="none"
							color="textPrimary"
						>
							Blog
						</Link>
					</Typography>
					<nav>
						<Link
							color="textPrimary"
							href="#"
							className={classes.link}
							component={NavLink}
							to="/register"
						>
							Register
						</Link>
					</nav>
					{!isAuth && <Button
						href="#"
						color="primary"
						variant="outlined"
						className={classes.link}
						component={NavLink}
						to="/login"
					>
						Login
					</Button>}
					{isAuth && <Button
						href="#"
						color="primary"
						variant="outlined"
						onClick={onClickLogOut}
						className={classes.link}
						component={NavLink}
						to="/logout"
					>
						Logout
					</Button>}
					{isAuth && <Button
						href="#"
						color="primary"
						variant="outlined"
						className={classes.link}
						component={NavLink}
						to="/profile"
					>
						My Profile
					</Button>}
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
}

export default Header;
