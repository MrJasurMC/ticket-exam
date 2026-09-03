const express = require('express');
const router = express.Router();
const deliveryMethodController = require('../controllers/deliveryMethodController');

/**
 * @swagger
 * tags:
 *   name: DeliveryMethods
 *   description: DeliveryMethod management
 */

/**
 * @swagger
 * /api/delivery-methods:
 *   post:
 *     tags: [DeliveryMethods]
 *     summary: Create a new deliverymethod
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
 *         description: DeliveryMethod created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/delivery-methods', deliveryMethodController.createDeliveryMethod);

/**
 * @swagger
 * /api/delivery-methods/search:
 *   get:
 *     tags: [DeliveryMethods]
 *     summary: Search deliverymethods
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of matching deliverymethods
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get('/delivery-methods/search', deliveryMethodController.searchDeliveryMethods);

/**
 * @swagger
 * /api/delivery-methods:
 *   get:
 *     tags: [DeliveryMethods]
 *     summary: Get all deliverymethods
 *     responses:
 *       200:
 *         description: List of deliverymethods
 *       500:
 *         description: Server error
 */
router.get('/delivery-methods', deliveryMethodController.getDeliveryMethods);

/**
 * @swagger
 * /api/delivery-methods/{id}:
 *   get:
 *     tags: [DeliveryMethods]
 *     summary: Get a deliverymethod by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: DeliveryMethod found
 *       404:
 *         description: DeliveryMethod not found
 *       500:
 *         description: Server error
 */
router.get('/delivery-methods/:id', deliveryMethodController.getDeliveryMethodById);

/**
 * @swagger
 * /api/delivery-methods/{id}:
 *   put:
 *     tags: [DeliveryMethods]
 *     summary: Update a deliverymethod by ID
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
 *         description: DeliveryMethod updated successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put('/delivery-methods/:id', deliveryMethodController.updateDeliveryMethod);

/**
 * @swagger
 * /api/delivery-methods/{id}:
 *   delete:
 *     tags: [DeliveryMethods]
 *     summary: Delete a deliverymethod by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: DeliveryMethod deleted
 *       404:
 *         description: DeliveryMethod not found
 *       500:
 *         description: Server error
 */
router.delete('/delivery-methods/:id', deliveryMethodController.deleteDeliveryMethod);

module.exports = router;
