const { Discount } = require("../models");
const { ValidateDiscount, ValidateDiscountUpdate } = require("../validation/discountValidation");
const { Op } = require("sequelize");

exports.createDiscount = async (req, res) => {
    const { error } = ValidateDiscount(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const item = await Discount.create(req.body);
        res.status(201).send(item);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getDiscounts = async (req, res) => {
    try {
        const items = await Discount.findAll();
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getDiscountById = async (req, res) => {
    try {
        const item = await Discount.findByPk(req.params.id);
        if (!item) return res.status(404).send("Discount not found");
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.updateDiscount = async (req, res) => {
    const { error } = ValidateDiscountUpdate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }
    try {
        const item = await Discount.findByPk(req.params.id);
        if (!item) return res.status(404).send("Discount not found");
        await item.update(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.deleteDiscount = async (req, res) => {
    try {
        const item = await Discount.findByPk(req.params.id);
        if (!item) return res.status(404).send("Discount not found");

        const itemData = item.toJSON();

        await item.destroy();
        res.status(200).send({ message: "Discount deleted successfully", data: itemData });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.searchDiscounts = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ error: "Search query is required" });
        }

        const items = await Discount.findAll({
            where: {
                discount: { [Op.iLike]: `%${query}%` }
            }
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
