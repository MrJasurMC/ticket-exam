const { Lang } = require("../models");
const { ValidateLang, ValidateLangUpdate } = require("../validation/langValidation");
const { Op } = require("sequelize");

exports.createLang = async (req, res) => {
    const { error } = ValidateLang(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const item = await Lang.create(req.body);
        res.status(201).send(item);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getLangs = async (req, res) => {
    try {
        const items = await Lang.findAll();
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getLangById = async (req, res) => {
    try {
        const item = await Lang.findByPk(req.params.id);
        if (!item) return res.status(404).send("Lang not found");
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.updateLang = async (req, res) => {
    const { error } = ValidateLangUpdate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }
    try {
        const item = await Lang.findByPk(req.params.id);
        if (!item) return res.status(404).send("Lang not found");
        await item.update(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.deleteLang = async (req, res) => {
    try {
        const item = await Lang.findByPk(req.params.id);
        if (!item) return res.status(404).send("Lang not found");

        const itemData = item.toJSON();

        await item.destroy();
        res.status(200).send({ message: "Lang deleted successfully", data: itemData });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.searchLangs = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ error: "Search query is required" });
        }

        const items = await Lang.findAll({
            where: {
                name: { [Op.iLike]: `%${query}%` }
            }
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
