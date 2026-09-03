const Joi = require('joi');

function ValidateCountry(country) {
    const schema = Joi.object({
        country_name: Joi.string().required(),
    });
    return schema.validate(country);
}

function ValidateCountryUpdate(country) {
    const schema = Joi.object({
        country_name: Joi.string().optional(),
    });
    return schema.validate(country);
}

module.exports = { ValidateCountry, ValidateCountryUpdate };
