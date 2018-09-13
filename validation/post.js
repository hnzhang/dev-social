const validator = require('validator');
const isEmpty = require('./utils');

module.exports = function validatePostInput(data){
    const errors = {};

    data.text = isEmpty(data.text) ? '' : data.text;

    if(validator.isEmpty(data.text)){
        errors.text = 'Text field is required';
    }
    if(!validator.isLength(data.text, {min:10, max: 300})){
        errors.text = "Text length must be between 10 to 300 chars";
    }

    return {errors: errors, isValid: isEmpty(errors)};
}