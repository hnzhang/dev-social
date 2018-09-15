import axios from 'axios';

import {GET_CURRENT_PROFILE,  PROFILE_LOADING, CLEAR_CURRENT_PROFILE} from './types';

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