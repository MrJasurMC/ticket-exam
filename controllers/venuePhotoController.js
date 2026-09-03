const { VenuePhoto, Venue } = require('../models');
const { ValidateVenuePhoto, ValidateVenuePhotoUpdate } = require('../validation/venuePhotoValidation');

exports.createVenuePhoto = async (req, res) => {
    const { error } = ValidateVenuePhoto(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const venuePhoto = await VenuePhoto.create(req.body);
        res.status(201).send(venuePhoto);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getVenuePhotos = async (req, res) => {
    try {
        const venuePhotos = await VenuePhoto.findAll({
            include: [{ model: Venue, as: 'venue' }]
        });
        res.status(200).send(venuePhotos);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getVenuePhotoById = async (req, res) => {
    try {
        const venuePhoto = await VenuePhoto.findByPk(req.params.id, {
            include: [{ model: Venue, as: 'venue' }]
        });
        if (!venuePhoto) return res.status(404).send("VenuePhoto not found");
        res.status(200).send(venuePhoto);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.updateVenuePhoto = async (req, res) => {
    const { error } = ValidateVenuePhotoUpdate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }
    try {
        const venuePhoto = await VenuePhoto.findByPk(req.params.id);
        if (!venuePhoto) return res.status(404).send("VenuePhoto not found");
        await venuePhoto.update(req.body);
        res.status(200).send(venuePhoto);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.deleteVenuePhoto = async (req, res) => {
    try {
        const venuePhoto = await VenuePhoto.findByPk(req.params.id);
        if (!venuePhoto) return res.status(404).send("VenuePhoto not found");

        const venuePhotoData = venuePhoto.toJSON();

        await venuePhoto.destroy();
        res.status(200).send({ message: "VenuePhoto deleted successfully", data: venuePhotoData });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
