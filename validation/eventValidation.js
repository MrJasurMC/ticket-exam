const Joi = require('joi');

function ValidateEvent(event) {
    const schema = Joi.object({
        name: Joi.string().required(),
        photo: Joi.string().allow(null, '').optional(),
        start_date: Joi.date().required(),
        start_time: Joi.string().allow(null, '').optional(),
        finish_date: Joi.date().allow(null).optional(),
        finish_time: Joi.string().allow(null, '').optional(),
        info: Joi.string().allow(null, '').optional(),
        event_type_id: Joi.number().integer().allow(null).optional(),
        human_category_id: Joi.number().integer().allow(null).optional(),
        venue_id: Joi.number().integer().required(),
        lang_id: Joi.number().integer().allow(null).optional(),
        release_date: Joi.date().allow(null).optional(),
    });
    return schema.validate(event);
}

function ValidateEventUpdate(event) {
    const schema = Joi.object({
        name: Joi.string().optional(),
        photo: Joi.string().allow(null, '').optional(),
        start_date: Joi.date().optional(),
        start_time: Joi.string().allow(null, '').optional(),
        finish_date: Joi.date().allow(null).optional(),
        finish_time: Joi.string().allow(null, '').optional(),
        info: Joi.string().allow(null, '').optional(),
        event_type_id: Joi.number().integer().allow(null).optional(),
        human_category_id: Joi.number().integer().allow(null).optional(),
        venue_id: Joi.number().integer().optional(),
        lang_id: Joi.number().integer().allow(null).optional(),
        release_date: Joi.date().allow(null).optional(),
    });
    return schema.validate(event);
}

module.exports = { ValidateEvent, ValidateEventUpdate };
