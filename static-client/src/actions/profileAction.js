import axios from 'axios';
import {logoutUser} from './loginAction'; 

import {GET_CURRENT_PROFILE,  PROFILE_LOADING, CLEAR_CURRENT_PROFILE,
	DELETE_ACCOUNT,
	GET_ERRORS,
} from './types';
import Experience from '../components/dashboard/Experience';

export const getCurrentProfile = () => dispatch =>{
	dispatch(setProfileLoading());
	axios.get('/api/profiles')
	.then(response=>{
		dispatch({ type:GET_CURRENT_PROFILE, payload: response.data, });
	})
	.catch(err=> dispatch({type: GET_CURRENT_PROFILE, payload: {}}));
}

export const setProfileLoading = () => dispatch =>{
	return {
		type: PROFILE_LOADING,
	}
}

export const clearCurrentProfile = () => dispatch =>{
	return {
		type: CLEAR_CURRENT_PROFILE,
	};
}

export const deleteAccount = (userData) => dispatch => {
	axios.delete('/api/profiles', userData)
		.then((response)=>{
			//logout
			dispatch(logoutUser());
		})
		.catch(error => dispatch({
			type:GET_ERRORS,
			payload: error.response,
		}))
	return {
		type: DELETE_ACCOUNT,
	};
}

export const createProfile = profileData =>dispatch =>{
	dispatch(setProfileLoading());
	axios.post('/api/profiles', profileData)
		.then(response=>{
			dispatch({ type:GET_CURRENT_PROFILE, payload: response.data, });
		})
	.catch(err=> dispatch({type: GET_CURRENT_PROFILE, payload: {}}));
}

export const addEducation = educationData => dispatch => {
	dispatch(setProfileLoading());
	axios.post('api/profiles/education', educationData)
		.then(response=> dispatch({type:GET_CURRENT_PROFILE, payload: response.data}))
		.catch(err => dispatch({type:GET_ERRORS, payload: err.response.data}));
}

export const addExperience = experienceData => dispatch => {
	dispatch(setProfileLoading());
	axios.post('/api/profiles/experience', experienceData)
		.then(response=> dispatch({type:GET_CURRENT_PROFILE, payload: response.data}))
		.catch(error => dispatch({type: GET_ERRORS, payload: error.response.data}));
}