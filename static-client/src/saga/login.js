import {put, call} from 'redux-saga/effects';

import jwtDecoder from 'jwt-decode';

import * as types from '../actions/types';

import {loginUser} from '../api/login';
import setAuthToken from '../utils/setAuthToken';

export function *loginUserSaga(action){
	try{
		console.log("Trying to login: loginUserSaga");
		const token = call(loginUser, action.payload);
		console.log(token);
		localStorage.setItem('jwtToken', token);
		//set token to Auth header
		setAuthToken(token);
		//deode data fro jwt
		const decoded = jwtDecoder(token);
		//set current user
		put({type: types.SET_CURRENT_USER, payload: decoded});
	}catch(err){
		console.log("login errr", err);
		put({type: types.GET_ERRORS, payload: err.response});
	}
}