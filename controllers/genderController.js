const { Gender } = require("../models");
const { ValidateGender, ValidateGenderUpdate } = require("../validation/genderValidation");
const { Op } = require("sequelize");

exports.createGender = async (req, res) => {
    const { error } = ValidateGender(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const item = await Gender.create(req.body);
        res.status(201).send(item);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getGenders = async (req, res) => {
    try {
        const items = await Gender.findAll();
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getGenderById = async (req, res) => {
    try {
        const item = await Gender.findByPk(req.params.id);
        if (!item) return res.status(404).send("Gender not found");
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.updateGender = async (req, res) => {
    const { error } = ValidateGenderUpdate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }
    try {
        const item = await Gender.findByPk(req.params.id);
        if (!item) return res.status(404).send("Gender not found");
        await item.update(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.deleteGender = async (req, res) => {
    try {
        const item = await Gender.findByPk(req.params.id);
        if (!item) return res.status(404).send("Gender not found");

        const itemData = item.toJSON();

        await item.destroy();
        res.status(200).send({ message: "Gender deleted successfully", data: itemData });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.searchGenders = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ error: "Search query is required" });
        }

        const items = await Gender.findAll({
            where: {
                name: { [Op.iLike]: `%${query}%` }
            }
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
