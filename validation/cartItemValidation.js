const Joi = require('joi');

function ValidateCartItem(cartItem) {
    const schema = Joi.object({
        ticket_id: Joi.number().integer().required(),
        cart_id: Joi.number().integer().required(),
    });
    return schema.validate(cartItem);
}

function ValidateCartItemUpdate(cartItem) {
    const schema = Joi.object({
        ticket_id: Joi.number().integer().optional(),
        cart_id: Joi.number().integer().optional(),
    });
    return schema.validate(cartItem);
}

module.exports = { ValidateCartItem, ValidateCartItemUpdate };
