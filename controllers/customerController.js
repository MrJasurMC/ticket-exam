const { Customer } = require('../models');
const { ValidateCustomer, ValidateCustomerUpdate } = require('../validation/customerValidation');
const { Op } = require('sequelize');

exports.createCustomer = async (req, res) => {
    const { error } = ValidateCustomer(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const customer = await Customer.create(req.body);
        res.status(201).send(customer);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.status(200).send(customers);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id);
        if (!customer) return res.status(404).send("Customer not found");
        res.status(200).send(customer);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.updateCustomer = async (req, res) => {
    const { error } = ValidateCustomerUpdate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }
    try {
        const customer = await Customer.findByPk(req.params.id);
        if (!customer) return res.status(404).send("Customer not found");
        await customer.update(req.body);
        res.status(200).send(customer);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.deleteCustomer = async (req, res) => {
    try{
        const customer = await Customer.findByPk(req.params.id);
        if (!customer) return res.status(404).send("Customer not found");

        const customerData = customer.toJSON();

        await customer.destroy();
        res.status(200).send({ message: "Customer deleted successfully", data: customerData });
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.searchCustomers = async (req, res) => {
    try {
        console.log("Query:", req.query.query);

        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ error: "Search query is required" });
        }

        const customers = await Customer.findAll({
            where: {
                [Op.or]: [
                    { first_name: { [Op.like]: `%${query}%` } },
                    { last_name: { [Op.like]: `%${query}%` } },
                    { email: { [Op.like]: `%${query}%` } }
                ]
            }
        });
        res.status(200).send(customers);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
