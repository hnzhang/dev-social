import {takeLatest} from 'redux-saga/effects';
import {getProfilesSaga, getProfileByHandleSaga} from './getProfiles';
import {loginUserSaga} from './login';
import * as types from '../actions/types';

export function *watchGetProfiles(){
	yield takeLatest(types.FETCH_PROFILES, getProfilesSaga);
}

export function *watchGetProfileByHandle(){
	yield takeLatest(types.FETCH_CURRENT_PROFILE, getProfileByHandleSaga);
}

export function *watchLoginUser(){
	yield takeLatest("TRY_TO_LOGIN", loginUserSaga);
}