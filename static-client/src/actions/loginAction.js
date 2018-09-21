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

export function loginAction(loginData, history){
	return {
		type: "TRY_TO_LOGIN",
		payload: loginData,
	}
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
