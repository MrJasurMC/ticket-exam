const { DeliveryMethod } = require("../models");
const { ValidateDeliveryMethod, ValidateDeliveryMethodUpdate } = require("../validation/deliveryMethodValidation");
const { Op } = require("sequelize");

exports.createDeliveryMethod = async (req, res) => {
    const { error } = ValidateDeliveryMethod(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const item = await DeliveryMethod.create(req.body);
        res.status(201).send(item);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getDeliveryMethods = async (req, res) => {
    try {
        const items = await DeliveryMethod.findAll();
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getDeliveryMethodById = async (req, res) => {
    try {
        const item = await DeliveryMethod.findByPk(req.params.id);
        if (!item) return res.status(404).send("DeliveryMethod not found");
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.updateDeliveryMethod = async (req, res) => {
    const { error } = ValidateDeliveryMethodUpdate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }
    try {
        const item = await DeliveryMethod.findByPk(req.params.id);
        if (!item) return res.status(404).send("DeliveryMethod not found");
        await item.update(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.deleteDeliveryMethod = async (req, res) => {
    try {
        const item = await DeliveryMethod.findByPk(req.params.id);
        if (!item) return res.status(404).send("DeliveryMethod not found");

        const itemData = item.toJSON();

        await item.destroy();
        res.status(200).send({ message: "DeliveryMethod deleted successfully", data: itemData });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.searchDeliveryMethods = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ error: "Search query is required" });
        }

        const items = await DeliveryMethod.findAll({
            where: {
                name: { [Op.iLike]: `%${query}%` }
            }
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
