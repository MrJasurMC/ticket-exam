const Joi = require('joi');

function ValidateDiscount(discount) {
    const schema = Joi.object({
        discount: Joi.string().required(),
        finish_date: Joi.date().required(),
    });
    return schema.validate(discount);
}

function ValidateDiscountUpdate(discount) {
    const schema = Joi.object({
        discount: Joi.string().optional(),
        finish_date: Joi.date().optional(),
    });
    return schema.validate(discount);
}

module.exports = { ValidateDiscount, ValidateDiscountUpdate };
