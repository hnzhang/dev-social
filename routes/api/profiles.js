
const express =  require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const User = require('../../models/User');
const Profile = require('../../models/Profile');

//validator
const validateProfileInput = require('../../validation/profile');

// @route GET api/profile/
// @desc get current user profile
// @access private
router.get('/', passport.authenticate('jwt', {session: false}),  (request, response) =>{
	const errors = {};
	Profile.findOne({user: request.user.id})
		.then(profile=>{
			if(!profile){
				errors.profile = "cannot find profile for user with id";
				return response.status(404).json(errors);
			}
			response.json(profile);
		})
		.catch(err => response.status(400).json(err));
});

/**
 * @route POST api/profiles/
 * @desc post profile for the current user
 * @access private
 */
router.post('/', passport.authenticate('jwt', { sesson: false}), (request, response)=>{
	const {errors, isValid} = validateProfileInput(request.body);
	//get all the fields for profile
	const profileFields = {};
	profileFields.user = request.user.id;
	if(request.body.handle){
		profileFields.handle = request.body.handle;
	}
	if(request.body.company){
		profileFields.company = request.body.company;
	}
	if(request.body.website){
		profileFields.website = request.body.website;
	}
	if(request.body.location){
		profileFields.location = request.body.location;
	}
	if(request.body.status){
		profileFields.status = request.body.status;
	}
	if(typeof request.body.skills !== 'undefined'){
		profileFields.skills = request.body.skills.split(',');
	}
	if(request.body.githubusername){
		profileFields.githubusername = request.body.githubusername;
	}
	profileFields.social = {};
	if(request.body.facebook){
		profileFields.social.facebook = request.body.facebook;
	}
	if(request.body.linkedin){
		profileFields.social.linkedin = request.body.linkedin;
	}
	if(request.body.twitter){
		profileFields.social.twitter = request.body.twitter;
	}
	if(request.body.intagram){
		profileFields.social.intagram = request.body.instagram;
	}

	Profile.findOne({user: request.user.id})
		.then(profile=>{
			if(profile){//this will be update instead of create
				Profile.update(
						{user: request.user.id},
						{ $set: profileFields},
						{new: true}
					).then(profile => response.json(profile));
			}else{//create
				Profile.findOne({handle: profileFields.handle})
					.then(profile =>{
						if(profile){
							errors.handle = "That handle already exists";
							response.status(400).json(errors);
						}
						new Profile(profileFields)
							.save()
							.then(profile=>response.json(profile))
							.catch(err=> response.status(404).json(err));
					});
			}
		});
});

/**
 * @route GET api/profiles/handle/:handle
 * @desc get profile by handle
 * @access public
 */
router.get('/handle/:handle', (request, response)=>{
	const errors = {};
	Profile.findOne({handle: request.params.handle})
		.populate('user', ['name', 'avatar'])
		.then(profile=>{
			if(!profile){
					errors.profile = 'No profile found for this user';
					return response.status(404).json(errors);
			}
			response.json(profile);
		})
		.catch(err => response.status(404).json(err));
});

/*
 * @route GET api/profiles/user/:user_id
 * @desc get user profile by user id
 * @access public
 */
router.get('/user/:user_id', (request, response)=>{
	const userId = request.params.user_id;
	Profile.findOne({user: userId})
		.populate('user', ['name', 'avatar'])
		.then(profile=>{
			if(!profile){
					errors.profile = '[Get user profile by id] No profile found for this user';
					return response.status(404).json(errors);
			}
			response.json(profile);
		})
		.catch(err => response.status(404).json({profile: 'No Profile for this user'}));
});

/**
 * @route GET api/profiles/all
 * @desc get all the profiles
 * @access public
 */
router.get('/all', (request, response)=>{
	const errors = {};
	Profile.find()
		.populate('user', ['name', 'avatar'])
		.then(profiles=>{
			if(!profiles){
				errors.profiles = "No profile found";
				return response.status(404).json(errors);
			}
			return response.json(profiles);
		})
		.catch(err => response.status(404).json({profiles: "Cannot get profiles"}));
});

module.exports = router;
