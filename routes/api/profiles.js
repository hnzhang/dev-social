
const express =  require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const User = require('../../models/User');
const Profile = require('../../models/Profile');

//validator
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

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
		profileFields.social.instagram = request.body.instagram;
	}
	if(request.body.youtube){
		profileFields.social.youtube = request.body.youtube;
	}
	if(request.body.bio){
		profileFields.bio = request.body.bio;
	}


	Profile.findOne({user: request.user.id})
		.then(profile=>{
			if(profile){//this will be update instead of create
				Profile.updateOne(
						{user: request.user.id},
						{ $set: profileFields},
						{new: true}
					).then((result) =>{ 
						Profile.findOne({user: request.user.id})
							.then(profile=>{
								response.json(profile);
								console.log(profile);
							});
					});
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

/**
 * @route POST api/profiles/experience
 * @desc add experience to profile
 * @access private
 */

 router.post('/experience', passport.authenticate('jwt', {session: false}), (request, response)=>{
	const {errors, isValid} = validateExperienceInput(request.body);
	if(!isValid){
		return response.status(404).json(errors);
	}
	Profile.findOne({user: request.user.id})
		.then(profile=>{
			if(!profile){//the doesn't have profile yet.
				errors.profile = "Cannot find profile for current user yet. Please add profile first";
				return response.status(404).json(errors);
			}
			const newExperience = {
				title: request.body.title,
				company: request.body.company,
				location: request.body.location,
				from: request.body.from,
				to: request.body.to,
				current: request.body.current ? true : false ,
				description: request.body.description,
			};
			//Add to experience array
			profile.experience.unshift(newExperience);
			profile.save();
			response.json(profile);
		})
		.catch(err => response.status(404).json(err));
 });

 /**
  * @route POST api/profiles/education
  * @desc add education to the profile
  * @access private
  */
router.post('/education', passport.authenticate('jwt', {session:false}), (request, response)=>{
	const {errors, isValid} = validateEducationInput(request.body);
	if(!isValid){
		return response.status(404).json(errors);
	}
	Profile.findOne({user:request.user.id})
		.then(profile=>{
			if(!profile){//the doesn't have profile yet.
				errors.profile = "Cannot find profile for current user yet. Please add profile first";
				return response.status(404).json(errors);
			}
			const newEducation = {
				school: request.body.school,
				degree: request.body.degree,
				fieldOfStudy: request.body.fieldOfStudy,
				from: request.body.from,
				to: request.body.to,
				current: request.body.current ? true : false,
				description: request.body.description,
			};
			//Add education to education array
			profile.education.unshift(newEducation);
			profile.save();

			response.json(profile);
		})
		.catch(err => response.status(404).json(err));
});

/**
 * @route DELETE api/profiles/experience/:exp_id
 * @desc delete experience from the profile
 * @access private
 */
router.delete('/experience/:exp_id', passport.authenticate('jwt', {session: false}), (request, response)=>{
	Profile.findOne({user: request.user.id})
		.then(profile=>{
			const removeIndex = profile.experience.map(item=>item.id)
				.indexOf(request.params.exp_id);
			if(removeIndex === -1){
				return response.status(404).json({experience:"cannot find related experience info"});
			}
			profile.experience.splice(removeIndex, 1);
			profile.save()
				.then(profile=>response.json(profile));
		});
});

/**
 * @route DELETE api/profiles/education/:education_id
 * @desc delete education info from profile
 * @access private
 */
router.delete('/education/:education_id', passport.authenticate('jwt', {session:false}), (request, response)=>{
	Profile.findOne({user: request.user.id})
		.then(profile=>{
			const removeIndex = profile.education.map(item=>item.id)
				.indexOf(request.params.education_id);
				if(removeIndex === -1){
					return response.status(404).json({education:"cannot find related education info"});
				}
			profile.education.splice(removeIndex, 1);
			profile.save()
				.then(profile=>response.json(profile));
		});


});

/**
 * @route DELETE user and profile
 * @description delete user and profile
 * @access private
 */
router.delete('/', passport.authenticate('jwt', {session: false}), (request, response)=>{
	Profile.findOneAndRemove({user: request.user.id})
		.then(()=>{
			//delete user
			User.findOneAndRemove({_id: request.user.id})
				.then(()=>{
					response.json({deletion: "Success"});
				})
		})
		.catch(err => response.status(404).json(err));
});

module.exports = router;
