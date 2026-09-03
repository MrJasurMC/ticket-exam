const Joi = require('joi');

function ValidateTicket(ticket) {
    const schema = Joi.object({
        event_id: Joi.number().integer().required(),
        seat_id: Joi.number().integer().required(),
        price: Joi.number().required(),
        service_fee: Joi.number().allow(null).optional(),
        status_id: Joi.number().integer().allow(null).optional(),
        ticket_type_id: Joi.number().integer().allow(null).optional(),
    });
    return schema.validate(ticket);
}

function ValidateTicketUpdate(ticket) {
    const schema = Joi.object({
        event_id: Joi.number().integer().optional(),
        seat_id: Joi.number().integer().optional(),
        price: Joi.number().optional(),
        service_fee: Joi.number().allow(null).optional(),
        status_id: Joi.number().integer().allow(null).optional(),
        ticket_type_id: Joi.number().integer().allow(null).optional(),
    });
    return schema.validate(ticket);
}

module.exports = { ValidateTicket, ValidateTicketUpdate };
