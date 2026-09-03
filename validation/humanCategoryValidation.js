const Joi = require('joi');

function ValidateHumanCategory(humanCategory) {
    const schema = Joi.object({
        name: Joi.string().required(),
        start_age: Joi.number().integer().required(),
        finish_age: Joi.number().integer().required(),
        gender_id: Joi.number().integer().allow(null).optional(),
    });
    return schema.validate(humanCategory);
}

function ValidateHumanCategoryUpdate(humanCategory) {
    const schema = Joi.object({
        name: Joi.string().optional(),
        start_age: Joi.number().integer().optional(),
        finish_age: Joi.number().integer().optional(),
        gender_id: Joi.number().integer().allow(null).optional(),
    });
    return schema.validate(humanCategory);
}

module.exports = { ValidateHumanCategory, ValidateHumanCategoryUpdate };
