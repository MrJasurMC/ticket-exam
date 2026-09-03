const Joi = require('joi');

function ValidateVenuePhoto(venuePhoto) {
    const schema = Joi.object({
        venueId: Joi.number().integer().required(),
        url: Joi.string().required(),
    });
    return schema.validate(venuePhoto);
}

function ValidateVenuePhotoUpdate(venuePhoto) {
    const schema = Joi.object({
        venueId: Joi.number().integer().optional(),
        url: Joi.string().optional(),
    });
    return schema.validate(venuePhoto);
}

module.exports = { ValidateVenuePhoto, ValidateVenuePhotoUpdate };
