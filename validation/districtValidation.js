const Joi = require('joi');

function ValidateDistrict(district) {
    const schema = Joi.object({
        name: Joi.string().required(),
        region_id: Joi.number().integer().required(),
    });
    return schema.validate(district);
}

function ValidateDistrictUpdate(district) {
    const schema = Joi.object({
        name: Joi.string().optional(),
        region_id: Joi.number().integer().optional(),
    });
    return schema.validate(district);
}

module.exports = { ValidateDistrict, ValidateDistrictUpdate };
