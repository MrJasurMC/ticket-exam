const { Country } = require('../models');
const { ValidateCountry, ValidateCountryUpdate } = require('../validation/countryValidation');
const { Op } = require('sequelize');

exports.createCountry = async (req, res) => {
    const { error } = ValidateCountry(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const country = await Country.create(req.body);
        res.status(201).send(country);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getCountries = async (req, res) => {
    try {
        const countries = await Country.findAll();
        res.status(200).send(countries);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getCountryById = async (req, res) => {
    try {
        const country = await Country.findByPk(req.params.id);
        if (!country) return res.status(404).send("Country not found");
        res.status(200).send(country);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.updateCountry = async (req, res) => {
    const { error } = ValidateCountryUpdate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }
    try {
        const country = await Country.findByPk(req.params.id);
        if (!country) return res.status(404).send("Country not found");
        await country.update(req.body);
        res.status(200).send(country);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.deleteCountry = async (req, res) => {
    try {
        const country = await Country.findByPk(req.params.id);
        if (!country) return res.status(404).send("Country not found");

        const countryData = country.toJSON();

        await country.destroy();
        res.status(200).send({ message: "Country deleted successfully", data: countryData });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.searchCountries = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ error: "Search query is required" });
        }

        const countries = await Country.findAll({
            where: {
                country_name: { [Op.iLike]: `%${query}%` }
            }
        });
        res.status(200).send(countries);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
