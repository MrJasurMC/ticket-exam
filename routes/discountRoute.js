const express = require('express');
const router = express.Router();
const discountController = require('../controllers/discountController');

/**
 * @swagger
 * tags:
 *   name: Discounts
 *   description: Discount management
 */

/**
 * @swagger
 * /api/discounts:
 *   post:
 *     tags: [Discounts]
 *     summary: Create a new discount
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
*               discount:
*                 type: string
*               finish_date:
*                 type: string
 *     responses:
 *       201:
 *         description: Discount created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/discounts', discountController.createDiscount);

/**
 * @swagger
 * /api/discounts/search:
 *   get:
 *     tags: [Discounts]
 *     summary: Search discounts
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of matching discounts
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get('/discounts/search', discountController.searchDiscounts);

/**
 * @swagger
 * /api/discounts:
 *   get:
 *     tags: [Discounts]
 *     summary: Get all discounts
 *     responses:
 *       200:
 *         description: List of discounts
 *       500:
 *         description: Server error
 */
router.get('/discounts', discountController.getDiscounts);

/**
 * @swagger
 * /api/discounts/{id}:
 *   get:
 *     tags: [Discounts]
 *     summary: Get a discount by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Discount found
 *       404:
 *         description: Discount not found
 *       500:
 *         description: Server error
 */
router.get('/discounts/:id', discountController.getDiscountById);

/**
 * @swagger
 * /api/discounts/{id}:
 *   put:
 *     tags: [Discounts]
 *     summary: Update a discount by ID
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
*               discount:
*                 type: string
*               finish_date:
*                 type: string
 *     responses:
 *       200:
 *         description: Discount updated successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put('/discounts/:id', discountController.updateDiscount);

/**
 * @swagger
 * /api/discounts/{id}:
 *   delete:
 *     tags: [Discounts]
 *     summary: Delete a discount by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Discount deleted
 *       404:
 *         description: Discount not found
 *       500:
 *         description: Server error
 */
router.delete('/discounts/:id', discountController.deleteDiscount);

module.exports = router;
