//register user
import axios from 'axios';

import { GET_ERRORS} from './types';
export const registerUser = (userData, history) => dispatch=>{
    axios.post('/api/users/register', userData)
      .then(response=>{
				history.push('/login');
				//console.log(response.data);
			})
      .catch(err=>{
				//console.log("get errors", GET_ERRORS);
					dispatch({ type: GET_ERRORS, payload: err.response.data, });
      });
}
