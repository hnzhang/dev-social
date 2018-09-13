const express =  require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post  = require('../../models/Post');

const validatePostInput = require('../../validation/post');

router.get('/test', (request, response)=>{
	response.json({msg:  "users work"});
});

/**
 * route POST api/posts
 * @description post a post
 * @access private
 */
 router.post('/', passport.authenticate('jwt', {sesson: false}), (request, response)=>{
	const {errors, isValid} = validatePostInput(request.body);
	if(!isValid){
		return response.status(400).json(errors);
	}
	const newPost = new Post( {
		text: request.body.text,
		name: request.body.name,
		avatar: request.body.avatar,
		user: request.user.id,
	});

	newPost.save()
		.then(post=> response.json(post));
 });

 /**
  * @route GET api/posts/:post_id
  * @description get a post based on post_id
  * @access private
  */

module.exports = router;
