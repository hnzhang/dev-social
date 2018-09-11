const express =  require("express");
const gravatar = require('gravatar');
const bcript = require('bcryptjs');
const jwt = require("jsonwebtoken");
const keys = require('../../config/keys');
const passport = require('passport');
const router = express.Router();

const User  = require('../../models/User');
const secrete = require('../../config/keys').secretOrKey;

router.get('/test', (request, response)=>{
	response.json({msg:  "users work"});
});

/**
 * @route GET api/users/register
 * @desc Register User
 * @access public
 */
router.post('/register', (request, response)=>{
	User.findOne({email: request.body.email})
		.then(user=>{
			if(user){
				return response.status(400).json({email: "Email alrady exists"}); //user exists already
			}else{
				const avatar = gravatar.url(request.body.email, {s:'200', r:'pg', d:'mm' });
				const newUser = new User({
					name: request.body.name,
					email: request.body.email,
					avatar,
					password: request.body.password,
				});
				bcript.genSalt(10, (err, salt)=>{
					bcript.hash(newUser.password, salt, (err, hash)=>{
						if(err){ 
							throw err;
						}

						newUser.password = hash;
						newUser.save()
							.then(user => response.json(user))
							.catch(err=> console.log(err) );
				});
			});
		}
	})
});

/**
 * @route GET api/users/login
 * @desc Login user / Returning JWT token
 * @access public
 */
router.post('/login', (request, response)=>{
	const email = request.body.email;
	const password =  request.body.password;

	User.findOne({email})
		.then(user=>{
			if(!user){
				return response.status(404).json({email: 'User not found'});
			}else{
				bcript.compare(password, user.password)
					.then(isMatch =>{
						if(isMatch){
							//response.json({msg: "Success"});
							//sign the token
							const payload = {id: user.id, name: user.name, avatar: user.avatar} //create jwt payload
							jwt.sign(payload, secrete, {expiresIn:3600}, (err, token)=>{
								response.json({
									success: true,
									token: 'Bearer ' + token //Bearer ?
								});
							});
						}else{
							return response.status(404).json({msg: 'password incorrect!'});
						}
					});
			}
		});
});

/**
 * @route GET api/users/current
 * @desc return current user
 * @access private
 */
router.get('/current', passport.authenticate('jwt', {session: false}), (request, response)=>{
	response.json({
		id: request.user.id,
		name: request.user.name,
		email: request.user.email
	});
});
module.exports = router;
