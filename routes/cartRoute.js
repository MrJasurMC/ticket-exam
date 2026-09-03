const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

/**
 * @swagger
 * tags:
 *   name: Carts
 *   description: Cart management
 */

/**
 * @swagger
 * /api/carts:
 *   post:
 *     tags: [Carts]
 *     summary: Create a new cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: integer
 *               status_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Cart created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/carts', cartController.createCart);

/**
 * @swagger
 * /api/carts:
 *   get:
 *     tags: [Carts]
 *     summary: Get all carts
 *     responses:
 *       200:
 *         description: List of carts
 *       500:
 *         description: Server error
 */
router.get('/carts', cartController.getCarts);

/**
 * @swagger
 * /api/carts/customer/{customerId}:
 *   get:
 *     tags: [Carts]
 *     summary: Get all carts for a given customer
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of carts for the customer
 *       500:
 *         description: Server error
 */
router.get('/carts/customer/:customerId', cartController.getCartsByCustomer);

/**
 * @swagger
 * /api/carts/{id}:
 *   get:
 *     tags: [Carts]
 *     summary: Get a cart by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cart found
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Server error
 */
router.get('/carts/:id', cartController.getCartById);

/**
 * @swagger
 * /api/carts/{id}:
 *   put:
 *     tags: [Carts]
 *     summary: Update a cart by ID
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
 *               customer_id:
 *                 type: integer
 *               finishedAt:
 *                 type: string
 *                 format: date-time
 *               status_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put('/carts/:id', cartController.updateCart);

/**
 * @swagger
 * /api/carts/{id}:
 *   delete:
 *     tags: [Carts]
 *     summary: Delete a cart by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cart deleted
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Server error
 */
router.delete('/carts/:id', cartController.deleteCart);

module.exports = router;
