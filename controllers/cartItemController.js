const { CartItem, Ticket, Cart } = require('../models');
const { ValidateCartItem, ValidateCartItemUpdate } = require('../validation/cartItemValidation');

exports.createCartItem = async (req, res) => {
    const { error } = ValidateCartItem(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const cartItem = await CartItem.create(req.body);
        res.status(201).send(cartItem);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getCartItems = async (req, res) => {
    try {
        const cartItems = await CartItem.findAll({
            include: [{ model: Ticket, as: 'ticket' }, { model: Cart, as: 'cart' }]
        });
        res.status(200).send(cartItems);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getCartItemById = async (req, res) => {
    try {
        const cartItem = await CartItem.findByPk(req.params.id, {
            include: [{ model: Ticket, as: 'ticket' }, { model: Cart, as: 'cart' }]
        });
        if (!cartItem) return res.status(404).send("CartItem not found");
        res.status(200).send(cartItem);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.updateCartItem = async (req, res) => {
    const { error } = ValidateCartItemUpdate(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }
    try {
        const cartItem = await CartItem.findByPk(req.params.id);
        if (!cartItem) return res.status(404).send("CartItem not found");
        await cartItem.update(req.body);
        res.status(200).send(cartItem);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.deleteCartItem = async (req, res) => {
    try {
        const cartItem = await CartItem.findByPk(req.params.id);
        if (!cartItem) return res.status(404).send("CartItem not found");

        const cartItemData = cartItem.toJSON();

        await cartItem.destroy();
        res.status(200).send({ message: "CartItem deleted successfully", data: cartItemData });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
