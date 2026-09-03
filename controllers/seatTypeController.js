const { SeatType } = require("../models");
const { ValidateSeatType, ValidateSeatTypeUpdate } = require("../validation/seatTypeValidation");
const { Op } = require("sequelize");

exports.createSeatType = async (req, res) => {
    const { error } = ValidateSeatType(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const item = await SeatType.create(req.body);
        res.status(201).send(item);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getSeatTypes = async (req, res) => {
    try {
        const items = await SeatType.findAll();
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getSeatTypeById = async (req, res) => {
    try {
        const item = await SeatType.findByPk(req.params.id);
        if (!item) return res.status(404).send("SeatType not found");
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.updateSeatType = async (req, res) => {
    const { error } = ValidateSeatTypeUpdate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }
    try {
        const item = await SeatType.findByPk(req.params.id);
        if (!item) return res.status(404).send("SeatType not found");
        await item.update(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.deleteSeatType = async (req, res) => {
    try {
        const item = await SeatType.findByPk(req.params.id);
        if (!item) return res.status(404).send("SeatType not found");

        const itemData = item.toJSON();

        await item.destroy();
        res.status(200).send({ message: "SeatType deleted successfully", data: itemData });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.searchSeatTypes = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ error: "Search query is required" });
        }

        const items = await SeatType.findAll({
            where: {
                name: { [Op.iLike]: `%${query}%` }
            }
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
