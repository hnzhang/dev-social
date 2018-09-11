const validator = require('validator');
const isEmpty = require('./utils');


function validateLoginInput(data){
    const errors = {};
    console.log(data);
    data.email = isEmpty(data.email) ? '' : data.email;
    data.password = isEmpty(data.password) ? '' : data.password;

    if(validator.isEmpty(data.email)){
        errors.email = 'Login email cannot be empty';
    }
    if(!validator.isEmail(data.email)){
        errors.email = `Invalid input as email ${data.email}`;
    }
    if(validator.isEmpty(data.password)){
        errors.password = `Login password cannot be empty ${data.password}`;
    }

    return {errors: errors, isValid: isEmpty(errors)};
}

module.exports = validateLoginInput;