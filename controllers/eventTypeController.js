const { EventType } = require('../models');
const { ValidateEventType, ValidateEventTypeUpdate } = require('../validation/eventTypeValidation');
const { Op } = require('sequelize');

exports.createEventType = async (req, res) => {
    const { error } = ValidateEventType(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const eventType = await EventType.create(req.body);
        res.status(201).send(eventType);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getEventTypes = async (req, res) => {
    try {
        const eventTypes = await EventType.findAll({
            include: [{ model: EventType, as: 'children' }]
        });
        res.status(200).send(eventTypes);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getEventTypeById = async (req, res) => {
    try {
        const eventType = await EventType.findByPk(req.params.id, {
            include: [{ model: EventType, as: 'children' }, { model: EventType, as: 'parent' }]
        });
        if (!eventType) return res.status(404).send("EventType not found");
        res.status(200).send(eventType);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.updateEventType = async (req, res) => {
    const { error } = ValidateEventTypeUpdate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }
    try {
        const eventType = await EventType.findByPk(req.params.id);
        if (!eventType) return res.status(404).send("EventType not found");
        await eventType.update(req.body);
        res.status(200).send(eventType);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.deleteEventType = async (req, res) => {
    try {
        const eventType = await EventType.findByPk(req.params.id);
        if (!eventType) return res.status(404).send("EventType not found");

        const eventTypeData = eventType.toJSON();

        await eventType.destroy();
        res.status(200).send({ message: "EventType deleted successfully", data: eventTypeData });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.searchEventTypes = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ error: "Search query is required" });
        }

        const eventTypes = await EventType.findAll({
            where: {
                name: { [Op.iLike]: `%${query}%` }
            }
        });
        res.status(200).send(eventTypes);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
