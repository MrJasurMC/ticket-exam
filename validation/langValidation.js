const Joi = require('joi');

function ValidateLang(lang) {
    const schema = Joi.object({
        name: Joi.string().required(),
    });
    return schema.validate(lang);
}

function ValidateLangUpdate(lang) {
    const schema = Joi.object({
        name: Joi.string().optional(),
    });
    return schema.validate(lang);
}

module.exports = { ValidateLang, ValidateLangUpdate };
