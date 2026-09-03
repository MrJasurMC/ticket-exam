const Joi = require('joi');

function ValidateAdmin(admin) {
    const schema = Joi.object({
        name: Joi.string().required(),
        login: Joi.string().required(),
        hashed_password: Joi.string().min(6).required(),
        is_active: Joi.boolean().optional(),
        is_creator: Joi.boolean().optional(),
    });
    return schema.validate(admin);
}

function ValidateAdminUpdate(admin) {
    const schema = Joi.object({
        name: Joi.string().optional(),
        login: Joi.string().optional(),
        hashed_password: Joi.string().min(6).optional(),
        is_active: Joi.boolean().optional(),
        is_creator: Joi.boolean().optional(),
    });
    return schema.validate(admin);
}

module.exports = { ValidateAdmin, ValidateAdminUpdate };
