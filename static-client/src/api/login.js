import axios from 'axios';

export const loginUser = (loginData) => {
	return axios.post('/api/users/login', loginData)
		.then(response => {
			const {token} = response.data;
			return token;
		});
}
