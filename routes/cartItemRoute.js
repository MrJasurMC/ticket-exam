const express = require('express');
const router = express.Router();
const cartItemController = require('../controllers/cartItemController');

/**
 * @swagger
 * tags:
 *   name: CartItems
 *   description: Cart item management
 */

/**
 * @swagger
 * /api/cart-items:
 *   post:
 *     tags: [CartItems]
 *     summary: Create a new cart item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticket_id:
 *                 type: integer
 *               cart_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: CartItem created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/cart-items', cartItemController.createCartItem);

/**
 * @swagger
 * /api/cart-items:
 *   get:
 *     tags: [CartItems]
 *     summary: Get all cart items
 *     responses:
 *       200:
 *         description: List of cart items
 *       500:
 *         description: Server error
 */
router.get('/cart-items', cartItemController.getCartItems);

/**
 * @swagger
 * /api/cart-items/{id}:
 *   get:
 *     tags: [CartItems]
 *     summary: Get a cart item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: CartItem found
 *       404:
 *         description: CartItem not found
 *       500:
 *         description: Server error
 */
router.get('/cart-items/:id', cartItemController.getCartItemById);

/**
 * @swagger
 * /api/cart-items/{id}:
 *   put:
 *     tags: [CartItems]
 *     summary: Update a cart item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticket_id:
 *                 type: integer
 *               cart_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: CartItem updated successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put('/cart-items/:id', cartItemController.updateCartItem);

/**
 * @swagger
 * /api/cart-items/{id}:
 *   delete:
 *     tags: [CartItems]
 *     summary: Delete a cart item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: CartItem deleted
 *       404:
 *         description: CartItem not found
 *       500:
 *         description: Server error
 */
router.delete('/cart-items/:id', cartItemController.deleteCartItem);

module.exports = router;
