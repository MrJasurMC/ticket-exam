const Joi = require('joi');

function ValidateVenueTypes(venueTypes) {
    const schema = Joi.object({
        venue_id: Joi.number().integer().required(),
        type_id: Joi.number().integer().required(),
    });
    return schema.validate(venueTypes);
}

function ValidateVenueTypesUpdate(venueTypes) {
    const schema = Joi.object({
        venue_id: Joi.number().integer().optional(),
        type_id: Joi.number().integer().optional(),
    });
    return schema.validate(venueTypes);
}

module.exports = { ValidateVenueTypes, ValidateVenueTypesUpdate };
