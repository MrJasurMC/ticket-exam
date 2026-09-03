const { TicketType } = require("../models");
const { ValidateTicketType, ValidateTicketTypeUpdate } = require("../validation/ticketTypeValidation");
const { Op } = require("sequelize");

exports.createTicketType = async (req, res) => {
    const { error } = ValidateTicketType(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const item = await TicketType.create(req.body);
        res.status(201).send(item);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getTicketTypes = async (req, res) => {
    try {
        const items = await TicketType.findAll();
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getTicketTypeById = async (req, res) => {
    try {
        const item = await TicketType.findByPk(req.params.id);
        if (!item) return res.status(404).send("TicketType not found");
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.updateTicketType = async (req, res) => {
    const { error } = ValidateTicketTypeUpdate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }
    try {
        const item = await TicketType.findByPk(req.params.id);
        if (!item) return res.status(404).send("TicketType not found");
        await item.update(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.deleteTicketType = async (req, res) => {
    try {
        const item = await TicketType.findByPk(req.params.id);
        if (!item) return res.status(404).send("TicketType not found");

        const itemData = item.toJSON();

        await item.destroy();
        res.status(200).send({ message: "TicketType deleted successfully", data: itemData });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.searchTicketTypes = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ error: "Search query is required" });
        }

        const items = await TicketType.findAll({
            where: {
                ticket_type: { [Op.iLike]: `%${query}%` }
            }
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
