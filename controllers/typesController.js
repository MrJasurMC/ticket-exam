const { Types } = require("../models");
const { ValidateTypes, ValidateTypesUpdate } = require("../validation/typesValidation");
const { Op } = require("sequelize");

exports.createTypes = async (req, res) => {
    const { error } = ValidateTypes(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const item = await Types.create(req.body);
        res.status(201).send(item);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getTypess = async (req, res) => {
    try {
        const items = await Types.findAll();
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getTypesById = async (req, res) => {
    try {
        const item = await Types.findByPk(req.params.id);
        if (!item) return res.status(404).send("Types not found");
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.updateTypes = async (req, res) => {
    const { error } = ValidateTypesUpdate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }
    try {
        const item = await Types.findByPk(req.params.id);
        if (!item) return res.status(404).send("Types not found");
        await item.update(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.deleteTypes = async (req, res) => {
    try {
        const item = await Types.findByPk(req.params.id);
        if (!item) return res.status(404).send("Types not found");

        const itemData = item.toJSON();

        await item.destroy();
        res.status(200).send({ message: "Types deleted successfully", data: itemData });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.searchTypess = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ error: "Search query is required" });
        }

        const items = await Types.findAll({
            where: {
                name: { [Op.iLike]: `%${query}%` }
            }
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
