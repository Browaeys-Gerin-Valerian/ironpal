const Joi = require('joi');

const schemas = {
    post: Joi.object({
        //data validation for route create session
        title: Joi.string().required(), //title is required and it must be a character string
        session_date: Joi.string().pattern(/^([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/).message('require this format: "aaaa-mm-jj"').required(), //session date is required and must respect a specific format as a string: (2012/12/12)
        muscle_group_id: Joi.number().optional(), //mucle group id is optional and it must be a number | null
        validated: Joi.boolean().invalid(false), // validate is a boolean and must be initialized to false
    }).required(),
};

export default schemas