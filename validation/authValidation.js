const Joi = require('joi');

function ValidateAdminLogin(body) {
    const schema = Joi.object({
        login: Joi.string().required(),
        password: Joi.string().required(),
    });
    return schema.validate(body);
}

function ValidateCustomerLogin(body) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    return schema.validate(body);
}

module.exports = { ValidateAdminLogin, ValidateCustomerLogin };
