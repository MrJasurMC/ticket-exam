const Joi = require('joi');

function ValidateCustomerCard(card) {
    const schema = Joi.object({
        customer_id: Joi.number().integer().required(),
        name: Joi.string().required(),
        phone: Joi.string().pattern(/^\+?[0-9]{9,13}$/).required(),
        number: Joi.string().required(),
        year: Joi.number().integer().required(),
        month: Joi.number().integer().required(),
        is_active: Joi.boolean().optional(),
        is_main: Joi.boolean().optional()
    });

    return schema.validate(card);
}

function ValidateCustomerCardUpdate(card) {
    const schema = Joi.object({
        customer_id: Joi.number().integer().optional(),
        name: Joi.string().optional(),
        phone: Joi.string().pattern(/^\+?[0-9]{9,13}$/).optional(),
        number: Joi.string().optional(),
        year: Joi.number().integer().optional(),
        month: Joi.number().integer().optional(),
        is_active: Joi.boolean().optional(),
        is_main: Joi.boolean().optional()
    });

    return schema.validate(card);
}

module.exports = { ValidateCustomerCard,  ValidateCustomerCardUpdate };
