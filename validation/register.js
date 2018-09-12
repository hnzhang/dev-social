<<<<<<< HEAD
const validator = require('validator');
const isEmpty = require('./utils');

module.exports = function validateRegisterInput(data){
	let errors = {};
	//
	if(!validator.isLength(data.name, {min:2, max: 30})){
		errors.name = 'Name must be between 2 and 30 characters';
	}

	return {
		errors: errors,
		isValid: isEmpty(errors)
	}
}
=======
const validator = require('validator');

const isEmpty = require('./utils');

function validateRegisterInput(data){
    const errors = {};

    data.name = isEmpty(data.name) ? '' : data.name;
    data.email = isEmpty(data.email) ? '': data.email;
    data.password = isEmpty(data.password) ? '': data.password;
    data.password2 = isEmpty(data.password2) ? '': data.password2;

    if(!validator.isLength(data.name, {min: 2, max: 30})){
        errors.name = "length of name must be between 2 and 30 characters";
    }
    if(validator.isEmpty(data.name)){
        errors.name = "Name cannot be empty";
    }

    if(validator.isEmpty(data.email)){
        errors.email = "email cannot be empty"
    }
    if(!validator.isEmail(data.email)){
        errors.email = "Email is invalid";
    }
    if(!validator.isLength(data.password, {min: 6, max: 30})){
        errors.password = "length of password must be between 6 and 30";
    }
    if(!validator.equals(data.password, data.password2)){
        errors.password2 = "password and password confirmation don't match!";
    }
    return {errors: errors, isValid: isEmpty(errors)};
}

module.exports = validateRegisterInput;
>>>>>>> 1f70720b465605b0aa4b05ad3dd3a2c4257c2c07
