import axios from 'axios';
import { GET_ERRORS, PASSED_LOGIN } from './types';

export const loginUser = (loginData, history) => dispatch => {
	axios.post('/api/users/login', loginData)
		.then(response => {
			dispatch({
				type:PASSED_LOGIN,
				payload:response.data,
			})
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