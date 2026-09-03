const Joi = require('joi');

function ValidatePaymentMethod(paymentMethod) {
    const schema = Joi.object({
        name: Joi.string().required(),
    });
    return schema.validate(paymentMethod);
}

function ValidatePaymentMethodUpdate(paymentMethod) {
    const schema = Joi.object({
        name: Joi.string().optional(),
    });
    return schema.validate(paymentMethod);
}

module.exports = { ValidatePaymentMethod, ValidatePaymentMethodUpdate };
