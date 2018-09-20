import {takelatest} from 'redux-saga/effects';
import getProfilesSaga from './getProfiles';

export default function *watchGetProfiles(){
	yield takelatest('FETCH_PROFILES', getProfilesSaga);
}