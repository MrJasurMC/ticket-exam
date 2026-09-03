const Joi = require('joi');

function ValidateCustomer(customer) {
    const schema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        phone: Joi.string().allow(null, '').optional(),
        hashed_password: Joi.string().min(6).required(),
        email: Joi.string().email().required(),
        birth_date: Joi.date().allow(null).optional(),
        gender_id: Joi.number().integer().allow(null).optional(),
        lang_id: Joi.number().integer().allow(null).optional(),
    });
    return schema.validate(customer);
}

function ValidateCustomerUpdate(customer) {
    const schema = Joi.object({
        first_name: Joi.string().optional(),
        last_name: Joi.string().optional(),
        phone: Joi.string().allow(null, '').optional(),
        hashed_password: Joi.string().min(6).optional(),
        email: Joi.string().email().optional(),
        birth_date: Joi.date().allow(null).optional(),
        gender_id: Joi.number().integer().allow(null).optional(),
        lang_id: Joi.number().integer().allow(null).optional(),
    });

    return schema.validate(customer);
}

module.exports = { ValidateCustomer, ValidateCustomerUpdate };
