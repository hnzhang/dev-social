
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
	profile.user = request.user.id;
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
	profile.social = {};
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

module.exports = router;
