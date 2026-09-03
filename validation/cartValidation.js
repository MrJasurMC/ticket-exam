const Joi = require('joi');

function ValidateCart(cart) {
    const schema = Joi.object({
        customer_id: Joi.number().integer().required(),
        status_id: Joi.number().integer().allow(null).optional(),
    });
    return schema.validate(cart);
}

function ValidateCartUpdate(cart) {
    const schema = Joi.object({
        customer_id: Joi.number().integer().optional(),
        finishedAt: Joi.date().allow(null).optional(),
        status_id: Joi.number().integer().allow(null).optional(),
    });
    return schema.validate(cart);
}

module.exports = { ValidateCart, ValidateCartUpdate };
