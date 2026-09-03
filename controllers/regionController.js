const { Region, District } = require('../models');
const { ValidateRegion, ValidateRegionUpdate } = require('../validation/regionValidation');
const { Op } = require('sequelize');

exports.createRegion = async (req, res) => {
    const { error } = ValidateRegion(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const region = await Region.create(req.body);
        res.status(201).send(region);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getRegions = async (req, res) => {
    try {
        const regions = await Region.findAll({
            include: [{ model: District, as: 'districts' }]
        });
        res.status(200).send(regions);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getRegionById = async (req, res) => {
    try {
        const region = await Region.findByPk(req.params.id, {
            include: [{ model: District, as: 'districts' }]
        });
        if (!region) return res.status(404).send("Region not found");
        res.status(200).send(region);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.updateRegion = async (req, res) => {
    const { error } = ValidateRegionUpdate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }
    try {
        const region = await Region.findByPk(req.params.id);
        if (!region) return res.status(404).send("Region not found");
        await region.update(req.body);
        res.status(200).send(region);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.deleteRegion = async (req, res) => {
    try {
        const region = await Region.findByPk(req.params.id);
        if (!region) return res.status(404).send("Region not found");

        const regionData = region.toJSON();

        await region.destroy();
        res.status(200).send({ message: "Region deleted successfully", data: regionData });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.searchRegions = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ error: "Search query is required" });
        }

        const regions = await Region.findAll({
            where: {
                name: { [Op.iLike]: `%${query}%` }
            }
        });
        res.status(200).send(regions);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
