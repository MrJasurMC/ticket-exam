const Joi = require('joi');

function ValidateTicketType(ticketType) {
    const schema = Joi.object({
        ticket_type: Joi.string().required(),
    });
    return schema.validate(ticketType);
}

function ValidateTicketTypeUpdate(ticketType) {
    const schema = Joi.object({
        ticket_type: Joi.string().optional(),
    });
    return schema.validate(ticketType);
}

module.exports = { ValidateTicketType, ValidateTicketTypeUpdate };
