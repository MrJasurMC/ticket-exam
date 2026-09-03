const Joi = require('joi');

function ValidateRegion(region) {
    const schema = Joi.object({
        name: Joi.string().required(),
    });
    return schema.validate(region);
}

function ValidateRegionUpdate(region) {
    const schema = Joi.object({
        name: Joi.string().optional(),
    });
    return schema.validate(region);
}

module.exports = { ValidateRegion, ValidateRegionUpdate };
