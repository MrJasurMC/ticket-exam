const { Sector } = require('../models');
const { ValidateSector, ValidateSectorUpdate } = require('../validation/sectorValidation');
const { Op } = require('sequelize');

exports.createSector = async (req, res) => {
    const { error } = ValidateSector(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const sector = await Sector.create(req.body);
        res.status(201).send(sector);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getSectors = async (req, res) => {
    try {
        const sectors = await Sector.findAll();
        res.status(200).send(sectors);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getSectorById = async (req, res) => {
    try {
        const sector = await Sector.findByPk(req.params.id);
        if (!sector) return res.status(404).send("Sector not found");
        res.status(200).send(sector);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.updateSector = async (req, res) => {
    const { error } = ValidateSectorUpdate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }
    try {
        const sector = await Sector.findByPk(req.params.id);
        if (!sector) return res.status(404).send("Sector not found");
        await sector.update(req.body);
        res.status(200).send(sector);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.deleteSector = async (req, res) => {
    try {
        const sector = await Sector.findByPk(req.params.id);
        if (!sector) return res.status(404).send("Sector not found");

        const sectorData = sector.toJSON();

        await sector.destroy();
        res.status(200).send({ message: "Sector deleted successfully", data: sectorData });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.searchSectors = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ error: "Search query is required" });
        }

        const sectors = await Sector.findAll({
            where: {
                sector_name: { [Op.iLike]: `%${query}%` }
            }
        });
        res.status(200).send(sectors);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
