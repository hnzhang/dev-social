import {GET_CURRENT_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_PROFILES} from '../actions/types';
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
		case GET_PROFILES:
			console.log("reducer of profiles", action.payload);
			return {
				...state,
				profiles: action.payload,
			};
		default:
			return state;
	}	
}

export default profileReducer;