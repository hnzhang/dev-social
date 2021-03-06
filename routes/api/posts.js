const express =  require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post  = require('../../models/Post');
const Profile = require('../../models/Profile');

const validatePostInput = require('../../validation/post');
const validatePostCommentInput = require('../../validation/postComment');

router.get('/test', (request, response)=>{
	response.json({msg:  "users work"});
});

/**
 * @route GET api/posts
 * @description get all the posts
 * @access public
 */

 router.get('/', (request, response)=>{
	Post.find()
		.sort({date: -1})
		.then(posts=>response.json(posts))
		.catch(err=> response.status(404).json({posts:"no post found"}));
 });

 /**
  * @route /api/posts/:post_id
  * @description get single post by post_id
  * @access public
  */
 router.get('/:post_id', (request, response)=>{
	Post.findById({_id: request.params.post_id })
		.then(posts=>{
			if(!posts){
				return response.status(404).json({posts:"no post found"});
			}
			response.json(posts);
		})
		.catch(err=> response.status(404).json({posts:"no post found"}));
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
  * @route DELETE api/posts/:post_id
  * @description delete a post based on post_id
  * @access private
  */
 router.delete('/:post_id', passport.authenticate('jwt', {session:false}), (request, response)=>{
	Profile.findOne({user: request.user.id})
		.then((profile=>{
			Post.findById(request.params.post_id)
				.then(post=>{
					if(post.user.toString() !== request.user.id){
						return response.status(401).json({errors: " not authorized to delete the post"});
					}
					post.remove().then(()=>{
						response.json({status: "Success of deleting post"});
					});
				})
				.catch(err => response.status(404).json({errors: " no post found for deletion"}));
		}));
 });

 /**
  * @route POST /api/posts/like/:post_id
  * @description to like a post based on post_id
  * @access
  */
 router.post('/like/:post_id', passport.authenticate('jwt', {session:false}), (request, response)=>{
	 Profile.findOne({user: request.user.id})
	 	.then(profile=>{
			 Post.findById(request.params.post_id)
				.then(post=>{
					if(post.likes.filter(like => like.user.toString() === request.user.id).length >0){
						return response.status(400).json({errors:"like exists already"});
					}
					post.likes.unshift({user: request.user.id});
					post.save().then(post=>response.json(post));
				 })
				 .catch(err => response.status(404).json(err));
		 });
 });

 /**
  * @route POST /api/posts/unlike/:post_id
  * @description unlike a post by removing previous like
  * @access private
  */
 router.post('/unlike/:post_id', passport.authenticate('jwt', {session:false}), (request, response)=>{
	Profile.findOne({user: request.user.id})
		.then(profile=>{
			Post.findById(request.params.post_id)
				.then(post=>{
					const likeIndex = post.likes.map(like => like.user.toString()).indexOf(request.user.id);
					if(likeIndex < 0){
						return response.status(400).json({errors: "[unlike] previous like not found"});
					}
					post.likes.splice(likeIndex, 1);
					post.save().then(post=>response.json(post));
				})
				.catch(err => response.status(404).json({post_unlike: "error happens during unlike"}));
		});
 });

 /**
  * @route POST /api/posts/comment/:post_id
  * @description add a comment to the post specified by post_id
  * @access private
  */
 router.post('/comment/:post_id', passport.authenticate('jwt', {session: false}), (request, response)=>{
	const {errors, isValid} = validatePostCommentInput(request.body);
	if(!isValid){
		return response.status(404).json(errors);
	}
	Profile.findOne({user: request.user.id})
		.then(profile=>{
			Post.findById(request.params.post_id)
				.then(post=>{
					const newComment = {
						user: request.user.id,
						text: request.body.text,
						name: profile.name,
						avatar: request.user.avatar,
					};
					console.log("newl comment data ", newComment);
					post.comments.unshift(newComment);
					post.save().then(()=> response.json(post));
					console.log("newly saved post", post);
				})
				//.catch(err => response.status(400).json({post_comment_add:" Error happened"}));
		});
 } );

/**
 * @route DELETE /api/posts/:post_id/comment/:comment_id
 * @description delete the comment specified by comment_id on a post specified by post_id
 * @access private
 */
router.delete('/:post_id/comment/:comment_id', passport.authenticate('jwt', {session: false}), (request, response)=>{
	Profile.findOne({user: request.user.id})
		.then(profile=>{
			Post.findById(request.params.post_id)
				.then(post=>{
					//find comment by id
					const commentIndex = post.comments.map(c => c._id.toString()).indexOf(request.params.comment_id);
					if(commentIndex < 0){
						return response.status(404).json({errors:"[post comment deletion] cannot find given comment with id"});
					}
					post.comments.splice(commentIndex, 1);
					post.save().then(post => response.json(post));
				})
				.catch(err => response.status(400).json({errors:"[post comment deletion] Error happened"}));
			});
})

module.exports = router;
