const Joi = require('joi');

function ValidateSeatType(seatType) {
    const schema = Joi.object({
        name: Joi.string().required(),
    });
    return schema.validate(seatType);
}

function ValidateSeatTypeUpdate(seatType) {
    const schema = Joi.object({
        name: Joi.string().optional(),
    });
    return schema.validate(seatType);
}

module.exports = { ValidateSeatType, ValidateSeatTypeUpdate };
