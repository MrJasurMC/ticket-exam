const Joi = require('joi');

function ValidateSeat(seat) {
    const schema = Joi.object({
        sector_id: Joi.number().integer().allow(null).optional(),
        row_number: Joi.number().integer().required(),
        number: Joi.number().integer().required(),
        venue_id: Joi.number().integer().required(),
        seat_type_id: Joi.number().integer().allow(null).optional(),
        location_in_schema: Joi.string().allow(null, '').optional(),
    });
    return schema.validate(seat);
}

function ValidateSeatUpdate(seat) {
    const schema = Joi.object({
        sector_id: Joi.number().integer().allow(null).optional(),
        row_number: Joi.number().integer().optional(),
        number: Joi.number().integer().optional(),
        venue_id: Joi.number().integer().optional(),
        seat_type_id: Joi.number().integer().allow(null).optional(),
        location_in_schema: Joi.string().allow(null, '').optional(),
    });
    return schema.validate(seat);
}

module.exports = { ValidateSeat, ValidateSeatUpdate };
