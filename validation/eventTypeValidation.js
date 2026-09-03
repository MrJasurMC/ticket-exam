const Joi = require('joi');

function ValidateEventType(eventType) {
    const schema = Joi.object({
        name: Joi.string().required(),
        parent_event_type_id: Joi.number().integer().allow(null).optional(),
    });
    return schema.validate(eventType);
}

function ValidateEventTypeUpdate(eventType) {
    const schema = Joi.object({
        name: Joi.string().optional(),
        parent_event_type_id: Joi.number().integer().allow(null).optional(),
    });
    return schema.validate(eventType);
}

module.exports = { ValidateEventType, ValidateEventTypeUpdate };
