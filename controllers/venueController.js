const { Venue, Region, District, VenuePhoto, Seat } = require('../models');
const { ValidateVenue, ValidateVenueUpdate } = require('../validation/venueValidation');
const { Op } = require('sequelize');

exports.createVenue = async (req, res) => {
    const { error } = ValidateVenue(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const venue = await Venue.create(req.body);
        res.status(201).send(venue);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getVenues = async (req, res) => {
    try {
        const venues = await Venue.findAll({
            include: [
                { model: Region, as: 'region' },
                { model: District, as: 'district' },
                { model: VenuePhoto, as: 'photos' },
            ]
        });
        res.status(200).send(venues);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getVenueById = async (req, res) => {
    try {
        const venue = await Venue.findByPk(req.params.id, {
            include: [
                { model: Region, as: 'region' },
                { model: District, as: 'district' },
                { model: VenuePhoto, as: 'photos' },
                { model: Seat, as: 'seats' },
            ]
        });
        if (!venue) return res.status(404).send("Venue not found");
        res.status(200).send(venue);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.updateVenue = async (req, res) => {
    const { error } = ValidateVenueUpdate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }
    try {
        const venue = await Venue.findByPk(req.params.id);
        if (!venue) return res.status(404).send("Venue not found");
        await venue.update(req.body);
        res.status(200).send(venue);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.deleteVenue = async (req, res) => {
    try {
        const venue = await Venue.findByPk(req.params.id);
        if (!venue) return res.status(404).send("Venue not found");

        const venueData = venue.toJSON();

        await venue.destroy();
        res.status(200).send({ message: "Venue deleted successfully", data: venueData });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.searchVenues = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ error: "Search query is required" });
        }

        const venues = await Venue.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } },
                    { address: { [Op.iLike]: `%${query}%` } }
                ]
            }
        });
        res.status(200).send(venues);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
