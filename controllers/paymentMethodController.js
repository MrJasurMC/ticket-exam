const { PaymentMethod } = require("../models");
const { ValidatePaymentMethod, ValidatePaymentMethodUpdate } = require("../validation/paymentMethodValidation");
const { Op } = require("sequelize");

exports.createPaymentMethod = async (req, res) => {
    const { error } = ValidatePaymentMethod(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const item = await PaymentMethod.create(req.body);
        res.status(201).send(item);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getPaymentMethods = async (req, res) => {
    try {
        const items = await PaymentMethod.findAll();
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getPaymentMethodById = async (req, res) => {
    try {
        const item = await PaymentMethod.findByPk(req.params.id);
        if (!item) return res.status(404).send("PaymentMethod not found");
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.updatePaymentMethod = async (req, res) => {
    const { error } = ValidatePaymentMethodUpdate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }
    try {
        const item = await PaymentMethod.findByPk(req.params.id);
        if (!item) return res.status(404).send("PaymentMethod not found");
        await item.update(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.deletePaymentMethod = async (req, res) => {
    try {
        const item = await PaymentMethod.findByPk(req.params.id);
        if (!item) return res.status(404).send("PaymentMethod not found");

        const itemData = item.toJSON();

        await item.destroy();
        res.status(200).send({ message: "PaymentMethod deleted successfully", data: itemData });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.searchPaymentMethods = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ error: "Search query is required" });
        }

        const items = await PaymentMethod.findAll({
            where: {
                name: { [Op.iLike]: `%${query}%` }
            }
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
