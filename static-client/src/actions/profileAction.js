import axios from 'axios';
import {logoutUser} from './loginAction'; 

import {GET_CURRENT_PROFILE,  PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_PROFILES,
	DELETE_ACCOUNT,
	GET_ERRORS,
} from './types';

export const getCurrentProfile = () => dispatch =>{
	dispatch(setProfileLoading());
	axios.get('/api/profiles')
	.then(response=>{
		dispatch({ type:GET_CURRENT_PROFILE, payload: response.data, });
	})
	.catch(err=> dispatch({type: GET_CURRENT_PROFILE, payload: {}}));
}

export const getProfiles = () => dispatch =>{
	dispatch(setProfileLoading());
	axios.get('/api/profiles/all')
	.then(response=>{

		dispatch({ type:GET_PROFILES, payload: response.data, });
	})
	.catch(err=> dispatch({type: GET_PROFILES, payload: {}}));
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
		.then(response=>{
			dispatch({type:GET_CURRENT_PROFILE, payload: response.data});
			dispatch({type:GET_ERRORS, payload: {}});//to clear errors
		})
		.catch(err => dispatch({type:GET_ERRORS, payload: err.response.data}));
}

export const addExperience = experienceData => dispatch => {
	dispatch(setProfileLoading());
	axios.post('/api/profiles/experience', experienceData)
		.then(response=>{
			dispatch({type:GET_CURRENT_PROFILE, payload: response.data});
			dispatch({type:GET_ERRORS, payload: {}});//to clear errors
		})
		.catch(error => dispatch({type: GET_ERRORS, payload: error.response.data}));
}

export const deleteEducation = (educationId) => dispatch => {
	dispatch(setProfileLoading());
	axios.delete(`/api/profiles/education/${educationId}`)
		.then(response => dispatch({type:GET_CURRENT_PROFILE, payload: response.data}))
		.catch(err => dispatch({type: GET_ERRORS, playload: err.response.data}));
}

export const deleteExperience= (experienceId) => dispatch => {
	dispatch(setProfileLoading());
	axios.delete(`/api/profiles/experience/${experienceId}`)
		.then(response => dispatch({type:GET_CURRENT_PROFILE, payload: response.data}))
		.catch(err => dispatch({type: GET_ERRORS, playload: err.response.data}));
}