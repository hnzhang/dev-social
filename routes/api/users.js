const express =  require("express");
const gravatar = require('gravatar');
const bcript = require('bcryptjs');
const router = express.Router();

const User  = require('../../models/User');

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

module.exports = router;
