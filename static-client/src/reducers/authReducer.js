//import {TEST_DISPATCH} from '../actions/types';
import {PASSED_LOGIN} from '../actions/types'

const initState = {
	isAuthenticated: false,
	user: {},
}

function reducer (state = initState, action){
	switch(action.type){
		case PASSED_LOGIN:
			return {...state, isAuthenticated:true, user: action.payload}; 
		default:
			return state;
	}
}

export default reducer;