import axios from 'axios';
import jwtDecoder from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

import setAuthToken from '../utils/setAuthToken';
import { clearCurrentProfile } from './profileAction';

export function setCurrentUser(userData){
	return {
		type: SET_CURRENT_USER,
		payload: userData,
	};
}

export const loginUser = (loginData, history) => dispatch => {
	axios.post('/api/users/login', loginData)
		.then(response => {
			//save to localStorage
			const {token} = response.data;
			localStorage.setItem('jwtToken', token);
			//set token to Auth header
			setAuthToken(token);
			//deode data fro jwt
			const decoded = jwtDecoder(token);
			//set current user
			dispatch(setCurrentUser(decoded));
			console.log(response.data);
			console.log("login successfully");
		})
		.catch(err=>{
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
}

export const logoutUser = ( ) => dispatch => {
	console.log("trying to logout");
	//remove token from localStorage
	localStorage.removeItem("jwtToken");
	//remove auth header from axios
	setAuthToken(false);
	dispatch( setCurrentUser({}));
	dispatch(clearCurrentProfile());
}
