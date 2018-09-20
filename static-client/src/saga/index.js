import {fork} from 'redux-saga/effects';
//import getPosts from './getPosts';
import getProfiles from './getProfiles';
/**
 * this is the rootSaga
 */
export default function *startForman(){
	//yield fork(getPosts);
	yield fork(getProfiles);
}