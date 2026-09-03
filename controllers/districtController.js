const { District, Region } = require('../models');
const { ValidateDistrict, ValidateDistrictUpdate } = require('../validation/districtValidation');
const { Op } = require('sequelize');

exports.createDistrict = async (req, res) => {
    const { error } = ValidateDistrict(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const district = await District.create(req.body);
        res.status(201).send(district);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getDistricts = async (req, res) => {
    try {
        const districts = await District.findAll({
            include: [{ model: Region, as: 'region' }]
        });
        res.status(200).send(districts);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getDistrictById = async (req, res) => {
    try {
        const district = await District.findByPk(req.params.id, {
            include: [{ model: Region, as: 'region' }]
        });
        if (!district) return res.status(404).send("District not found");
        res.status(200).send(district);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.updateDistrict = async (req, res) => {
    const { error } = ValidateDistrictUpdate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }
    try {
        const district = await District.findByPk(req.params.id);
        if (!district) return res.status(404).send("District not found");
        await district.update(req.body);
        res.status(200).send(district);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.deleteDistrict = async (req, res) => {
    try {
        const district = await District.findByPk(req.params.id);
        if (!district) return res.status(404).send("District not found");

        const districtData = district.toJSON();

        await district.destroy();
        res.status(200).send({ message: "District deleted successfully", data: districtData });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.searchDistricts = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ error: "Search query is required" });
        }

        const districts = await District.findAll({
            where: {
                name: { [Op.iLike]: `%${query}%` }
            },
            include: [{ model: Region, as: 'region' }]
        });
        res.status(200).send(districts);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
