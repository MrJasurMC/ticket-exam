const { Admin } = require('../models');
const { ValidateAdmin, ValidateAdminUpdate } = require('../validation/adminValidation');
const { ValidateAdminLogin } = require('../validation/authValidation');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = require('../config/constants');

exports.login = async (req, res) => {
    const { error } = ValidateAdminLogin(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const { login, password } = req.body;
        const admin = await Admin.scope('withSensitive').findOne({ where: { login } });
        if (!admin || !admin.is_active) {
            return res.status(401).send({ error: "Invalid login or password" });
        }

        const isMatch = await bcrypt.compare(password, admin.hashed_password);
        if (!isMatch) {
            return res.status(401).send({ error: "Invalid login or password" });
        }

        const token = jwt.sign(
            { id: admin.id, role: "admin", is_creator: admin.is_creator },
            ACCESS_TOKEN_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).send({ token, admin: { id: admin.id, name: admin.name, login: admin.login, is_creator: admin.is_creator } });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.createAdmin = async (req, res) => {
    const { error } = ValidateAdmin(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const admin = await Admin.create(req.body);
        res.status(201).send(admin);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getAdmins = async (req, res) => {
    try {
        const admins = await Admin.findAll();
        res.status(200).send(admins);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.params.id);
        if (!admin) return res.status(404).send("Admin not found");
        res.status(200).send(admin);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.updateAdmin = async (req, res) => {
    const { error } = ValidateAdminUpdate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }
    try {
        const admin = await Admin.findByPk(req.params.id);
        if (!admin) return res.status(404).send("Admin not found");
        await admin.update(req.body);
        res.status(200).send(admin);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.deleteAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.params.id);
        if (!admin) return res.status(404).send("Admin not found");

        const adminData = admin.toJSON();

        await admin.destroy();
        res.status(200).send({ message: "Admin deleted successfully", data: adminData });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.searchAdmins = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ error: "Search query is required" });
        }

        const admins = await Admin.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } },
                    { login: { [Op.iLike]: `%${query}%` } }
                ]
            }
        });
        res.status(200).send(admins);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
