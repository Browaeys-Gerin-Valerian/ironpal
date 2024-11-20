const Joi = require('joi');

const schemas = {
    post: Joi.object({
        //data validation for route register user
        firstname: Joi.string().required(), //first name is required and it must be a character string
        lastname: Joi.string().required(), //last name is required and it must be a character string
        email: Joi.string().pattern(/^([a-zA-Z0-9.\-_]{1,64}@[a-zA-Z0-9]+\.[a-zA-Z]{1,63}){1,255}$/).required(), //email is required, must be a character string and must respect: - between 1 and 64 characters can include numbers, as well as dashes - must include an @ - must include numbers and/or letters - must include a period and end with letters between 1 and 64 characters and all this must not exceed 255 characters
        password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$/).required(), //password must include: an uppercase letter, a lowercase letter, a special character, a number and all this must include 8 characters
        repeat_password: Joi.ref('password'), //repeat password
        birthdate: Joi.string().pattern(/^([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/).message('require this format: aaaa-mm-jj').optional(), //birthday is optional but must respect a specific format: (12/12/2012)
    }).required(),
};

export default schemas