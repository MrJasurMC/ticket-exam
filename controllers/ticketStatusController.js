const { TicketStatus } = require("../models");
const { ValidateTicketStatus, ValidateTicketStatusUpdate } = require("../validation/ticketStatusValidation");
const { Op } = require("sequelize");

exports.createTicketStatus = async (req, res) => {
    const { error } = ValidateTicketStatus(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const item = await TicketStatus.create(req.body);
        res.status(201).send(item);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getTicketStatuss = async (req, res) => {
    try {
        const items = await TicketStatus.findAll();
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getTicketStatusById = async (req, res) => {
    try {
        const item = await TicketStatus.findByPk(req.params.id);
        if (!item) return res.status(404).send("TicketStatus not found");
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.updateTicketStatus = async (req, res) => {
    const { error } = ValidateTicketStatusUpdate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }
    try {
        const item = await TicketStatus.findByPk(req.params.id);
        if (!item) return res.status(404).send("TicketStatus not found");
        await item.update(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.deleteTicketStatus = async (req, res) => {
    try {
        const item = await TicketStatus.findByPk(req.params.id);
        if (!item) return res.status(404).send("TicketStatus not found");

        const itemData = item.toJSON();

        await item.destroy();
        res.status(200).send({ message: "TicketStatus deleted successfully", data: itemData });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.searchTicketStatuss = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ error: "Search query is required" });
        }

        const items = await TicketStatus.findAll({
            where: {
                name: { [Op.iLike]: `%${query}%` }
            }
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
