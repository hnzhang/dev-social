const isEmpty = require('./utils');

const validator = require('validator');

function validateProfileInput(data){
    const errors = {};

    data.handle = isEmpty(data.handle) ? '' : data.handle;
    data.status = isEmpty(data.status) ? '' : data.status;
    data.skills = isEmpty(data.skills) ? '' : data.skills;
    data.status = isEmpty(data.status) ? "" : data.status;
    if(validator.isLength(data.handle, {min: 2, max: 40})){
        errors.handle = 'Handle needs to be between 2 and 40 chars';
    }
    if(validator.isEmpty(data.handle)){
        errors.handle = "Profile handle is required";
    }
    if(validator.isEmpty(data.status)){
        errors.status = 'Profile status is required';
    }

    if(validator.isEmpty(data.skills)){
        errors.skills = "Profile's skills are required";
    }
    if(isEmpty(data.website)){
        if(!validator.isURL(data.website)){
            errors.website = "Profile website has to be a valid URL";
        }
    }
    if(validator.isEmpty(data.status)){
        errors.status = 'Profile status needs a value';
    }


    return {errors: errors, isValid: isEmpty(errors)};
}

module.exports = validateProfileInput;