const { CustomerCard, Customer } = require('../models');
const { ValidateCustomerCard, ValidateCustomerCardUpdate } = require('../validation/customerCardValidation');
const { Op } = require('sequelize');

exports.createCard = async (req, res) => {
    const { error } = ValidateCustomerCard(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const customerCard = await CustomerCard.create(req.body);
        res.status(201).send(customerCard);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getCards = async (req, res) => {
    try {
        const customerCards = await CustomerCard.findAll({
            include: [{ model: Customer, as: 'customer' }]
        });
        res.status(200).send(customerCards);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getCardById = async (req, res) => {
    try {
        const customerCard = await CustomerCard.findByPk(req.params.id, {
            include: [{ model: Customer, as: 'customer' }]
        });
        
        if (!customerCard) return res.status(404).send("Customer Card not found");
        res.status(200).send(customerCard);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.updateCard = async (req, res) => {
    const { error } = ValidateCustomerCardUpdate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }
    try {
        const customerCard = await CustomerCard.findByPk(req.params.id);
        if (!customerCard) return res.status(404).send("CustomerCard not found");
        await customerCard.update(req.body);
        res.status(200).send(customerCard);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.deleteCard = async (req, res) => {
    try{
        const customerCard = await CustomerCard.findByPk(req.params.id);
        if (!customerCard) return res.status(404).send("Customer Card not found");

        const customerCardData = customerCard.toJSON();

        await customerCard.destroy();
        res.status(200).send({ message: "CustomerCard deleted successfully", data: customerCardData });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.searchCustomerCards = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ error: "Search query is required" });
        }

        const customerCards = await CustomerCard.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } },
                    { phone: { [Op.iLike]: `%${query}%` } },
                    { number: { [Op.iLike]: `%${query}%` } }
                ]
            },
            include: [{ model: Customer, as: 'customer' }]
        });
        res.status(200).send(customerCards);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
