import {fork} from 'redux-saga/effects';
//import getPosts from './getPosts';
import {
	watchGetProfiles, watchGetProfileByHandle,
	watchLoginUser,
} from './watcher';

/**
 * this is the rootSaga
 */
export default function *startForman(){
	yield fork(watchGetProfiles);
	yield fork(watchGetProfileByHandle);
	yield fork(watchLoginUser);
}