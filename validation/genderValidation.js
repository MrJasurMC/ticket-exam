const Joi = require('joi');

function ValidateGender(gender) {
    const schema = Joi.object({
        name: Joi.string().required(),
    });
    return schema.validate(gender);
}

function ValidateGenderUpdate(gender) {
    const schema = Joi.object({
        name: Joi.string().optional(),
    });
    return schema.validate(gender);
}

module.exports = { ValidateGender, ValidateGenderUpdate };
