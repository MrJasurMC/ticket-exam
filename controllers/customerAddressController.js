const { CustomerAddress, Customer, Region, District, Flat } = require('../models');
const { ValidateCustomerAddress, ValidateCustomerAddressUpdate } = require('../validation/customerAddressValidation');

exports.createCustomerAddress = async (req, res) => {
    const { error } = ValidateCustomerAddress(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const address = await CustomerAddress.create(req.body);
        res.status(201).send(address);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getCustomerAddresss = async (req, res) => {
    try {
        const addresses = await CustomerAddress.findAll({
            include: [
                { model: Customer, as: 'customer' },
                { model: Region, as: 'region' },
                { model: District, as: 'district' },
                { model: Flat, as: 'flat' },
            ]
        });
        res.status(200).send(addresses);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getCustomerAddressById = async (req, res) => {
    try {
        const address = await CustomerAddress.findByPk(req.params.id, {
            include: [
                { model: Customer, as: 'customer' },
                { model: Region, as: 'region' },
                { model: District, as: 'district' },
                { model: Flat, as: 'flat' },
            ]
        });
        if (!address) return res.status(404).send("CustomerAddress not found");
        res.status(200).send(address);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.updateCustomerAddress = async (req, res) => {
    const { error } = ValidateCustomerAddressUpdate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }
    try {
        const address = await CustomerAddress.findByPk(req.params.id);
        if (!address) return res.status(404).send("CustomerAddress not found");
        await address.update(req.body);
        res.status(200).send(address);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.deleteCustomerAddress = async (req, res) => {
    try {
        const address = await CustomerAddress.findByPk(req.params.id);
        if (!address) return res.status(404).send("CustomerAddress not found");

        const addressData = address.toJSON();

        await address.destroy();
        res.status(200).send({ message: "CustomerAddress deleted successfully", data: addressData });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
