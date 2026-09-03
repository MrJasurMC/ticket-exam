const Joi = require('joi');

function ValidateVenueTypes(venueTypes) {
    const schema = Joi.object({
        venueId: Joi.number().integer().required(),
        typeId: Joi.number().integer().required(),
    });
    return schema.validate(venueTypes);
}

function ValidateVenueTypesUpdate(venueTypes) {
    const schema = Joi.object({
        venueId: Joi.number().integer().optional(),
        typeId: Joi.number().integer().optional(),
    });
    return schema.validate(venueTypes);
}

module.exports = { ValidateVenueTypes, ValidateVenueTypesUpdate };
