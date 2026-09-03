const { Flat } = require("../models");
const { ValidateFlat, ValidateFlatUpdate } = require("../validation/flatValidation");
const { Op } = require("sequelize");

exports.createFlat = async (req, res) => {
    const { error } = ValidateFlat(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const item = await Flat.create(req.body);
        res.status(201).send(item);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getFlats = async (req, res) => {
    try {
        const items = await Flat.findAll();
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getFlatById = async (req, res) => {
    try {
        const item = await Flat.findByPk(req.params.id);
        if (!item) return res.status(404).send("Flat not found");
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.updateFlat = async (req, res) => {
    const { error } = ValidateFlatUpdate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }
    try {
        const item = await Flat.findByPk(req.params.id);
        if (!item) return res.status(404).send("Flat not found");
        await item.update(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.deleteFlat = async (req, res) => {
    try {
        const item = await Flat.findByPk(req.params.id);
        if (!item) return res.status(404).send("Flat not found");

        const itemData = item.toJSON();

        await item.destroy();
        res.status(200).send({ message: "Flat deleted successfully", data: itemData });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.searchFlats = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ error: "Search query is required" });
        }

        const items = await Flat.findAll({
            where: {
                condition: { [Op.iLike]: `%${query}%` }
            }
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
