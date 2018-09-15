import {GET_CURRENT_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE} from '../actions/types';
const initState = {
	profile: null,
	profiles: null,
	loading: false,
};

function profileReducer (state = initState, action){
	switch(action.type){
		case PROFILE_LOADING:
			return {
				...state,
				loading: true,
			};
		case GET_CURRENT_PROFILE:
			return {
				...state,
				loading: false,
				profile: action.payload,
			};
		case CLEAR_CURRENT_PROFILE:
			return {
				...state,
				profile: null,
			};
		default:
			return state;
	}	
}

export default profileReducer;