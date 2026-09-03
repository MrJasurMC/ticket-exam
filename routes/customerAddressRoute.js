const express = require('express');
const router = express.Router();
const customerAddressController = require('../controllers/customerAddressController');

/**
 * @swagger
 * tags:
 *   name: CustomerAddresses
 *   description: Customer address management
 */

/**
 * @swagger
 * /api/customer-addresses:
 *   post:
 *     tags: [CustomerAddresses]
 *     summary: Create a new customer address
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
 *               region_id:
 *                 type: integer
 *               district_id:
 *                 type: integer
 *               street:
 *                 type: string
 *               house:
 *                 type: string
 *               flat_id:
 *                 type: integer
 *               location:
 *                 type: string
 *               post_index:
 *                 type: string
 *               info:
 *                 type: string
 *     responses:
 *       201:
 *         description: CustomerAddress created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/customer-addresses', customerAddressController.createCustomerAddress);

/**
 * @swagger
 * /api/customer-addresses:
 *   get:
 *     tags: [CustomerAddresses]
 *     summary: Get all customer addresses
 *     responses:
 *       200:
 *         description: List of customer addresses
 *       500:
 *         description: Server error
 */
router.get('/customer-addresses', customerAddressController.getCustomerAddresss);

/**
 * @swagger
 * /api/customer-addresses/{id}:
 *   get:
 *     tags: [CustomerAddresses]
 *     summary: Get a customer address by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: CustomerAddress found
 *       404:
 *         description: CustomerAddress not found
 *       500:
 *         description: Server error
 */
router.get('/customer-addresses/:id', customerAddressController.getCustomerAddressById);

/**
 * @swagger
 * /api/customer-addresses/{id}:
 *   put:
 *     tags: [CustomerAddresses]
 *     summary: Update a customer address by ID
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
 *               name:
 *                 type: string
 *               region_id:
 *                 type: integer
 *               district_id:
 *                 type: integer
 *               street:
 *                 type: string
 *               house:
 *                 type: string
 *               flat_id:
 *                 type: integer
 *               location:
 *                 type: string
 *               post_index:
 *                 type: string
 *               info:
 *                 type: string
 *     responses:
 *       200:
 *         description: CustomerAddress updated successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put('/customer-addresses/:id', customerAddressController.updateCustomerAddress);

/**
 * @swagger
 * /api/customer-addresses/{id}:
 *   delete:
 *     tags: [CustomerAddresses]
 *     summary: Delete a customer address by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: CustomerAddress deleted
 *       404:
 *         description: CustomerAddress not found
 *       500:
 *         description: Server error
 */
router.delete('/customer-addresses/:id', customerAddressController.deleteCustomerAddress);

module.exports = router;
