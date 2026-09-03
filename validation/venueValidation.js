const Joi = require('joi');

function ValidateVenue(venue) {
    const schema = Joi.object({
        name: Joi.string().required(),
        address: Joi.string().required(),
        location: Joi.string().allow(null, '').optional(),
        site: Joi.string().allow(null, '').optional(),
        phone: Joi.string().allow(null, '').optional(),
        schema: Joi.string().allow(null, '').optional(),
        region_id: Joi.number().integer().allow(null).optional(),
        district_id: Joi.number().integer().allow(null).optional(),
    });
    return schema.validate(venue);
}

function ValidateVenueUpdate(venue) {
    const schema = Joi.object({
        name: Joi.string().optional(),
        address: Joi.string().optional(),
        location: Joi.string().allow(null, '').optional(),
        site: Joi.string().allow(null, '').optional(),
        phone: Joi.string().allow(null, '').optional(),
        schema: Joi.string().allow(null, '').optional(),
        region_id: Joi.number().integer().allow(null).optional(),
        district_id: Joi.number().integer().allow(null).optional(),
    });
    return schema.validate(venue);
}

module.exports = { ValidateVenue, ValidateVenueUpdate };
