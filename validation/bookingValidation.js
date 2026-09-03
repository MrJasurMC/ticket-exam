const Joi = require('joi');

function ValidateBooking(booking) {
    const schema = Joi.object({
        cart_id: Joi.number().integer().required(),
        payment_method_id: Joi.number().integer().allow(null).optional(),
        delivery_method_id: Joi.number().integer().allow(null).optional(),
        discount_id: Joi.number().integer().allow(null).optional(),
        status_id: Joi.number().integer().allow(null).optional(),
    });
    return schema.validate(booking);
}

function ValidateBookingUpdate(booking) {
    const schema = Joi.object({
        payment_method_id: Joi.number().integer().allow(null).optional(),
        delivery_method_id: Joi.number().integer().allow(null).optional(),
        discount_id: Joi.number().integer().allow(null).optional(),
        status_id: Joi.number().integer().allow(null).optional(),
        finished: Joi.date().allow(null).optional(),
    });
    return schema.validate(booking);
}

module.exports = { ValidateBooking, ValidateBookingUpdate };
