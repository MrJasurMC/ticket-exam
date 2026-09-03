const Joi = require('joi');

function ValidateTicketStatus(ticketStatus) {
    const schema = Joi.object({
        name: Joi.string().required(),
    });
    return schema.validate(ticketStatus);
}

function ValidateTicketStatusUpdate(ticketStatus) {
    const schema = Joi.object({
        name: Joi.string().optional(),
    });
    return schema.validate(ticketStatus);
}

module.exports = { ValidateTicketStatus, ValidateTicketStatusUpdate };
