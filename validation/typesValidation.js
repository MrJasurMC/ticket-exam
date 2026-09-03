const Joi = require('joi');

function ValidateTypes(types) {
    const schema = Joi.object({
        name: Joi.string().required(),
    });
    return schema.validate(types);
}

function ValidateTypesUpdate(types) {
    const schema = Joi.object({
        name: Joi.string().optional(),
    });
    return schema.validate(types);
}

module.exports = { ValidateTypes, ValidateTypesUpdate };
