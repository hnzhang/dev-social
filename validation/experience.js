const isEmpty = require('./utils');
const validator = require('validator');

module.exports = function validateExperienceInput(data){
    let errors = {};
    	data.title = isEmpty(data.title) ? "" :data.title;
		data.company = isEmpty(data.company) ? '' : data.company;
		data.location = isEmpty(data.location) ? '' : data.location;
		data.from = isEmpty(data.from) ? '' : data.from;
		data.to = isEmpty(data.to) ? '' : data.to;
		data.current = isEmpty(data.current) ? '' : data.current;
        data.description = isEmpty(data.description) ? '' : data.description;

        if(validator.isEmpty(data.title)){
            errors.title = 'Job title field is required';
        }
        if(validator.isEmpty(data.company)){
            errors.company = 'Company field is required';
        }
        if(validator.isEmpty(data.location)){
            errors.location = 'Job location field is required';
        }
        if(validator.isEmpty(data.from)){
            errors.from = 'Job start date field is required';
        }
        
        if(validator.isEmpty(data.to) && (!validator.isBoolean(data.current.toString())|| validator.toBoolean(data.current.toString()) !== true) ){
            errors.to = 'Job should have end date or be current';
            errors.current = 'Job should have end date or be current';
        }
        if(validator.isEmpty(data.description)){
            errors.description = 'Job description field is required';
        }

    return {errors: errors, isValid: isEmpty(errors)};
}