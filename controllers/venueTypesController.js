const { VenueTypes, Venue, Types } = require('../models');
const { ValidateVenueTypes, ValidateVenueTypesUpdate } = require('../validation/venueTypesValidation');

exports.createVenueTypes = async (req, res) => {
    const { error } = ValidateVenueTypes(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const venueTypes = await VenueTypes.create(req.body);
        res.status(201).send(venueTypes);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getVenueTypess = async (req, res) => {
    try {
        const venueTypes = await VenueTypes.findAll({
            include: [{ model: Venue, as: 'venue' }, { model: Types, as: 'type' }]
        });
        res.status(200).send(venueTypes);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getVenueTypesById = async (req, res) => {
    try {
        const venueTypes = await VenueTypes.findByPk(req.params.id, {
            include: [{ model: Venue, as: 'venue' }, { model: Types, as: 'type' }]
        });
        if (!venueTypes) return res.status(404).send("VenueTypes not found");
        res.status(200).send(venueTypes);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.updateVenueTypes = async (req, res) => {
    const { error } = ValidateVenueTypesUpdate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }
    try {
        const venueTypes = await VenueTypes.findByPk(req.params.id);
        if (!venueTypes) return res.status(404).send("VenueTypes not found");
        await venueTypes.update(req.body);
        res.status(200).send(venueTypes);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.deleteVenueTypes = async (req, res) => {
    try {
        const venueTypes = await VenueTypes.findByPk(req.params.id);
        if (!venueTypes) return res.status(404).send("VenueTypes not found");

        const venueTypesData = venueTypes.toJSON();

        await venueTypes.destroy();
        res.status(200).send({ message: "VenueTypes deleted successfully", data: venueTypesData });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
