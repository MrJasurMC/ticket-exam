const Joi = require('joi');

function ValidateDeliveryMethod(deliveryMethod) {
    const schema = Joi.object({
        name: Joi.string().required(),
    });
    return schema.validate(deliveryMethod);
}

function ValidateDeliveryMethodUpdate(deliveryMethod) {
    const schema = Joi.object({
        name: Joi.string().optional(),
    });
    return schema.validate(deliveryMethod);
}

module.exports = { ValidateDeliveryMethod, ValidateDeliveryMethodUpdate };
