const express = require('express');
const router = express.Router();
const customerCardController = require('../controllers/customerCardController');

/**
 * @swagger
 * tags:
 *   name: CustomerCards
 *   description: Customer card management
 */

/**
 * @swagger
 * /api/customersCards:
 *   post:
 *     tags: [CustomerCards]
 *     summary: Create a new card for a customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               number:
 *                 type: string
 *               year:
 *                 type: integer
 *               month:
 *                 type: integer
 *               is_active:
 *                 type: boolean
 *               is_main:
 *                 type: boolean
 *               customer_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Card created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/customersCards', customerCardController.createCard);

/**
 * @swagger
 * /api/customersCards:
 *   get:
 *     tags: [CustomerCards]
 *     summary: Get all customer cards
 *     responses:
 *       200:
 *         description: List of all cards
 *       500:
 *         description: Server error
 */
router.get('/customersCards', customerCardController.getCards);

/**
 * @swagger
 * /api/customersCards/search:
 *   get:
 *     tags: [CustomerCards]
 *     summary: Search cards by name, phone or number
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search keyword
 *     responses:
 *       200:
 *         description: Search results
 *       400:
 *         description: Query is required
 *       500:
 *         description: Server error
 */
router.get('/customersCards/search', customerCardController.searchCustomerCards);

/**
 * @swagger
 * /api/customersCards/{id}:
 *   get:
 *     tags: [CustomerCards]
 *     summary: Get card by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Card ID
 *     responses:
 *       200:
 *         description: Card found
 *       404:
 *         description: Card not found
 *       500:
 *         description: Server error
 */
router.get('/customersCards/:id', customerCardController.getCardById);

/**
 * @swagger
 * /api/customersCards/{id}:
 *   put:
 *     tags: [CustomerCards]
 *     summary: Update card by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Card ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               number:
 *                 type: string
 *               year:
 *                 type: integer
 *               month:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Card updated successfully
 *       404:
 *         description: Card not found
 *       500:
 *         description: Server error
 */
router.put('/customersCards/:id', customerCardController.updateCard);

/**
 * @swagger
 * /api/customersCards/{id}:
 *   delete:
 *     tags: [CustomerCards]
 *     summary: Delete card by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Card ID
 *     responses:
 *       200:
 *         description: Card deleted successfully
 *       404:
 *         description: Card not found
 *       500:
 *         description: Server error
 */
router.delete('/customersCards/:id', customerCardController.deleteCard);

module.exports = router;
