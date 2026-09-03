const { Cart, Customer, CartItem, Ticket, TicketStatus } = require('../models');
const { ValidateCart, ValidateCartUpdate } = require('../validation/cartValidation');

exports.createCart = async (req, res) => {
    const { error } = ValidateCart(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const cart = await Cart.create(req.body);
        res.status(201).send(cart);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getCarts = async (req, res) => {
    try {
        const carts = await Cart.findAll({
            include: [
                { model: Customer, as: 'customer' },
                { model: CartItem, as: 'items', include: [{ model: Ticket, as: 'ticket' }] },
            ]
        });
        res.status(200).send(carts);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getCartById = async (req, res) => {
    try {
        const cart = await Cart.findByPk(req.params.id, {
            include: [
                { model: Customer, as: 'customer' },
                { model: CartItem, as: 'items', include: [{ model: Ticket, as: 'ticket' }] },
            ]
        });
        if (!cart) return res.status(404).send("Cart not found");
        res.status(200).send(cart);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.updateCart = async (req, res) => {
    const { error } = ValidateCartUpdate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }
    try {
        const cart = await Cart.findByPk(req.params.id);
        if (!cart) return res.status(404).send("Cart not found");
        await cart.update(req.body);
        res.status(200).send(cart);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.deleteCart = async (req, res) => {
    try {
        const cart = await Cart.findByPk(req.params.id);
        if (!cart) return res.status(404).send("Cart not found");

        const cartData = cart.toJSON();

        await cart.destroy();
        res.status(200).send({ message: "Cart deleted successfully", data: cartData });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getCartsByCustomer = async (req, res) => {
    try {
        const carts = await Cart.findAll({
            where: { customer_id: req.params.customerId },
            include: [{ model: CartItem, as: 'items', include: [{ model: Ticket, as: 'ticket' }] }]
        });
        res.status(200).send(carts);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
