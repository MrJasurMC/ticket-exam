const { Customer } = require('../models');
const { ValidateCustomer, ValidateCustomerUpdate } = require('../validation/customerValidation');
const { ValidateCustomerLogin } = require('../validation/authValidation');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = require('../config/constants');

exports.login = async (req, res) => {
    const { error } = ValidateCustomerLogin(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const { email, password } = req.body;
        const customer = await Customer.scope('withSensitive').findOne({ where: { email } });
        if (!customer) {
            return res.status(401).send({ error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, customer.hashed_password);
        if (!isMatch) {
            return res.status(401).send({ error: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: customer.id, role: "customer" },
            ACCESS_TOKEN_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).send({ token, customer: { id: customer.id, first_name: customer.first_name, last_name: customer.last_name, email: customer.email } });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

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
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ error: "Search query is required" });
        }

        const customers = await Customer.findAll({
            where: {
                [Op.or]: [
                    { first_name: { [Op.iLike]: `%${query}%` } },
                    { last_name: { [Op.iLike]: `%${query}%` } },
                    { email: { [Op.iLike]: `%${query}%` } }
                ]
            }
        });
        res.status(200).send(customers);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
