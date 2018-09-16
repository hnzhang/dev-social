const isEmpty = require('./utils');
const validator = require('validator');

module.exports = function validateEducationInput(data){
    const errors = {};
    data.school = isEmpty(data.school) ? '' : data.school;
	data.degree = isEmpty(data.degree) ? '': data.degree;
	data.from = isEmpty(data.from) ? '': data.from;
	data.to = isEmpty(data.to) ? '' : data.to;
	data.current = isEmpty(data.current) ? '' : data.current;

    if(validator.isEmpty(data.school)){
        errors.school = "School field is required";
    }
    if(validator.isEmpty(data.degree)){
        errors.degree = "Degree info is needed for education";
    }
    if(validator.isEmpty(data.from)){
        errors.from = "Starting date is needed for education info";
    }
    if(validator.isEmpty(data.to) && (validator.isEmpty(data.current.toString()) || validator.toBoolean(data.current.toString()) === false )){
        errors.to = "Ending date is needed for education info";
        errors.current = "Please either provide ending date or set current as true";
    }
    return {errors: errors, isValid: isEmpty(errors)};
}