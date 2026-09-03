const Joi = require('joi');

function ValidateSector(sector) {
    const schema = Joi.object({
        sector_name: Joi.string().required(),
    });
    return schema.validate(sector);
}

function ValidateSectorUpdate(sector) {
    const schema = Joi.object({
        sector_name: Joi.string().optional(),
    });
    return schema.validate(sector);
}

module.exports = { ValidateSector, ValidateSectorUpdate };
