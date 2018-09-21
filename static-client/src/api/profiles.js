import axios from 'axios';

export const getProfiles = () =>{
	//dispatch(setProfileLoading());
	return axios.get('/api/profiles/all')
							.then(response=>  response.data);
}


export const getProfileByHandle = (profileHandle) => {
	return axios.get(`/api/profiles/handle/${profileHandle}`)
		.then(response =>{ 
			return response.data});
}