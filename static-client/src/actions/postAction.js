import axios from 'axios';

import {
	ADD_POST,
	GET_POST,

	GET_ERRORS,
	GET_POSTS,
	DELETE_POST,
} from './types';

export const addPost = postData => dispatch => {
	axios.post('/api/posts', postData)
		.then(response => dispatch({type: ADD_POST, payload: response.data}))
		.catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}));
}

export const deletePost = (postId) => dispatch => {
	axios.delete(`/api/posts/${postId}`)
	.then(response => dispatch({type:DELETE_POST}))
	.catch(err => dispatch({type:GET_ERRORS, payload: err.response.data}));
}

export const getPosts = () => dispatch =>{
	axios.get('/api/posts')
		.then(response => dispatch({type: GET_POSTS, payload: response.data}))
		.catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}));
}

export const addLike = (postId) =>dispatch => {
	axios.post(`/api/posts/like/${postId}`)
		.then(response=>dispatch(getPosts()) )
		.catch(err => dispatch({type:GET_ERRORS, payload: err.response.data}));
}


export const removeLike = (postId) =>dispatch => {
	axios.post(`/api/posts/unlike/${postId}`)
		.then(response=>dispatch(getPosts()) )
		.catch(err => dispatch({type:GET_ERRORS, payload: err.response.data}));
}

export const getPost = (postId) => dispatch => {
	axios.get(`/api/posts/${postId}`)
		.then(response =>{
		 dispatch({type:GET_POST, payload: response.data});
		})
		.catch(err=> dispatch({type:GET_POST, payload:{}}));
}

export const addComment = (postId, comment) => dispatch => {
	axios.post(`/api/posts/comment/${postId}`, comment)
	.then(response=>dispatch({type:GET_POST, payload: response.data}))
	.catch(err => dispatch({type: GET_ERRORS, payload: err.response}));
}

export const deleteComment = (postId, commentId) => dispatch => {
	axios.delete(`/api/posts/${postId}/comment/${commentId}`)
		.then(response=> dispatch({type: GET_POST, payload: response.data}))
		.catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}));
}