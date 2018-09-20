
import {put, call} from 'redux-saga/effects';

import * as types from '../actions/types';

import {getProfiles} from '../api/profiles';

export default function *getProfileSaga(obj){
	try{
		const profiles =  yield call(getProfiles);
		yield put({type: types.GET_PROFILES, payload:profiles});
	}catch(err){
		yield put({type: types.GET_PROFILES, payload: []});
	}
}