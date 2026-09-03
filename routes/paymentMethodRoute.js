const express = require('express');
const router = express.Router();
const paymentMethodController = require('../controllers/paymentMethodController');

/**
 * @swagger
 * tags:
 *   name: PaymentMethods
 *   description: PaymentMethod management
 */

/**
 * @swagger
 * /api/payment-methods:
 *   post:
 *     tags: [PaymentMethods]
 *     summary: Create a new paymentmethod
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
*               name:
*                 type: string
 *     responses:
 *       201:
 *         description: PaymentMethod created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/payment-methods', paymentMethodController.createPaymentMethod);

/**
 * @swagger
 * /api/payment-methods/search:
 *   get:
 *     tags: [PaymentMethods]
 *     summary: Search paymentmethods
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of matching paymentmethods
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get('/payment-methods/search', paymentMethodController.searchPaymentMethods);

/**
 * @swagger
 * /api/payment-methods:
 *   get:
 *     tags: [PaymentMethods]
 *     summary: Get all paymentmethods
 *     responses:
 *       200:
 *         description: List of paymentmethods
 *       500:
 *         description: Server error
 */
router.get('/payment-methods', paymentMethodController.getPaymentMethods);

/**
 * @swagger
 * /api/payment-methods/{id}:
 *   get:
 *     tags: [PaymentMethods]
 *     summary: Get a paymentmethod by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: PaymentMethod found
 *       404:
 *         description: PaymentMethod not found
 *       500:
 *         description: Server error
 */
router.get('/payment-methods/:id', paymentMethodController.getPaymentMethodById);

/**
 * @swagger
 * /api/payment-methods/{id}:
 *   put:
 *     tags: [PaymentMethods]
 *     summary: Update a paymentmethod by ID
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
*               name:
*                 type: string
 *     responses:
 *       200:
 *         description: PaymentMethod updated successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put('/payment-methods/:id', paymentMethodController.updatePaymentMethod);

/**
 * @swagger
 * /api/payment-methods/{id}:
 *   delete:
 *     tags: [PaymentMethods]
 *     summary: Delete a paymentmethod by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: PaymentMethod deleted
 *       404:
 *         description: PaymentMethod not found
 *       500:
 *         description: Server error
 */
router.delete('/payment-methods/:id', paymentMethodController.deletePaymentMethod);

module.exports = router;
