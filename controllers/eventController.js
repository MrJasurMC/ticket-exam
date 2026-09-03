const { Event, EventType, HumanCategory, Venue, Lang } = require('../models');
const { ValidateEvent, ValidateEventUpdate } = require('../validation/eventValidation');
const { Op } = require('sequelize');

exports.createEvent = async (req, res) => {
    const { error } = ValidateEvent(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const event = await Event.create(req.body);
        res.status(201).send(event);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.findAll({
            include: [
                { model: EventType, as: 'eventType' },
                { model: HumanCategory, as: 'humanCategory' },
                { model: Venue, as: 'venue' },
                { model: Lang, as: 'lang' },
            ]
        });
        res.status(200).send(events);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id, {
            include: [
                { model: EventType, as: 'eventType' },
                { model: HumanCategory, as: 'humanCategory' },
                { model: Venue, as: 'venue' },
                { model: Lang, as: 'lang' },
            ]
        });
        if (!event) return res.status(404).send("Event not found");
        res.status(200).send(event);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.updateEvent = async (req, res) => {
    const { error } = ValidateEventUpdate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }
    try {
        const event = await Event.findByPk(req.params.id);
        if (!event) return res.status(404).send("Event not found");
        await event.update(req.body);
        res.status(200).send(event);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (!event) return res.status(404).send("Event not found");

        const eventData = event.toJSON();

        await event.destroy();
        res.status(200).send({ message: "Event deleted successfully", data: eventData });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.searchEvents = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ error: "Search query is required" });
        }

        const events = await Event.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } },
                    { info: { [Op.iLike]: `%${query}%` } }
                ]
            },
            include: [{ model: Venue, as: 'venue' }]
        });
        res.status(200).send(events);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
