const Joi = require('joi');

function ValidateFlat(flat) {
    const schema = Joi.object({
        etaj: Joi.number().integer().required(),
        condition: Joi.string().required(),
    });
    return schema.validate(flat);
}

function ValidateFlatUpdate(flat) {
    const schema = Joi.object({
        etaj: Joi.number().integer().optional(),
        condition: Joi.string().optional(),
    });
    return schema.validate(flat);
}

module.exports = { ValidateFlat, ValidateFlatUpdate };
