import {put, call} from 'redux-saga/effects';
import * as types from '../actions/types';

import {getProfiles, getProfileByHandle} from '../api/profiles';

export function *getProfilesSaga(obj){
	try{
		const profiles =  yield call(getProfiles);
		yield put({type: types.GET_PROFILES, payload:profiles});
	}catch(err){
		yield put({type: types.GET_PROFILES, payload: []});
	}
}

export function *getProfileByHandleSaga(action){
	try{
		const profile = yield call(getProfileByHandle, action.payload);
		yield put({type: types.GET_CURRENT_PROFILE, payload: profile});
	}catch(err){
		yield put({type: types.GET_CURRENT_PROFILE, payload:{} });
	}
}