const Joi = require('joi');

function ValidateCustomerAddress(address) {
    const schema = Joi.object({
        customer_id: Joi.number().integer().required(),
        name: Joi.string().allow(null, '').optional(),
        region_id: Joi.number().integer().allow(null).optional(),
        district_id: Joi.number().integer().allow(null).optional(),
        street: Joi.string().allow(null, '').optional(),
        house: Joi.string().allow(null, '').optional(),
        flat_id: Joi.number().integer().allow(null).optional(),
        location: Joi.string().allow(null, '').optional(),
        post_index: Joi.string().allow(null, '').optional(),
        info: Joi.string().allow(null, '').optional(),
    });
    return schema.validate(address);
}

function ValidateCustomerAddressUpdate(address) {
    const schema = Joi.object({
        customer_id: Joi.number().integer().optional(),
        name: Joi.string().allow(null, '').optional(),
        region_id: Joi.number().integer().allow(null).optional(),
        district_id: Joi.number().integer().allow(null).optional(),
        street: Joi.string().allow(null, '').optional(),
        house: Joi.string().allow(null, '').optional(),
        flat_id: Joi.number().integer().allow(null).optional(),
        location: Joi.string().allow(null, '').optional(),
        post_index: Joi.string().allow(null, '').optional(),
        info: Joi.string().allow(null, '').optional(),
    });
    return schema.validate(address);
}

module.exports = { ValidateCustomerAddress, ValidateCustomerAddressUpdate };
