const { HumanCategory, Gender } = require('../models');
const { ValidateHumanCategory, ValidateHumanCategoryUpdate } = require('../validation/humanCategoryValidation');
const { Op } = require('sequelize');

exports.createHumanCategory = async (req, res) => {
    const { error } = ValidateHumanCategory(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const humanCategory = await HumanCategory.create(req.body);
        res.status(201).send(humanCategory);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getHumanCategorys = async (req, res) => {
    try {
        const humanCategories = await HumanCategory.findAll({
            include: [{ model: Gender, as: 'gender' }]
        });
        res.status(200).send(humanCategories);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getHumanCategoryById = async (req, res) => {
    try {
        const humanCategory = await HumanCategory.findByPk(req.params.id, {
            include: [{ model: Gender, as: 'gender' }]
        });
        if (!humanCategory) return res.status(404).send("HumanCategory not found");
        res.status(200).send(humanCategory);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.updateHumanCategory = async (req, res) => {
    const { error } = ValidateHumanCategoryUpdate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }
    try {
        const humanCategory = await HumanCategory.findByPk(req.params.id);
        if (!humanCategory) return res.status(404).send("HumanCategory not found");
        await humanCategory.update(req.body);
        res.status(200).send(humanCategory);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.deleteHumanCategory = async (req, res) => {
    try {
        const humanCategory = await HumanCategory.findByPk(req.params.id);
        if (!humanCategory) return res.status(404).send("HumanCategory not found");

        const humanCategoryData = humanCategory.toJSON();

        await humanCategory.destroy();
        res.status(200).send({ message: "HumanCategory deleted successfully", data: humanCategoryData });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.searchHumanCategorys = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ error: "Search query is required" });
        }

        const humanCategories = await HumanCategory.findAll({
            where: {
                name: { [Op.iLike]: `%${query}%` }
            },
            include: [{ model: Gender, as: 'gender' }]
        });
        res.status(200).send(humanCategories);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
