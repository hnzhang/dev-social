import axios from 'axios';

export const getProfiles = () =>{
	//dispatch(setProfileLoading());
	return axios.get('/api/profiles/all')
							.then(response=>  response.data);
}