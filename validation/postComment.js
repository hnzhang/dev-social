const validator = require('validator');
const isEmpty = require('./utils');

module.exports = function validatePostCommentInput(data){
    const errors = {};
    console.log(data);
    data.text = isEmpty(data.text) ? '' : data.text;
    console.log(data);
    if(!validator.isLength(data.text, {min:1, max: 300})){
        errors.text = "post comment content cannot be empty and cannot exceed 300 letters";
    }

    return {errors: errors, isValid: isEmpty(errors)};
}