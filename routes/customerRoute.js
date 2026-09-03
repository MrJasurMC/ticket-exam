const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Customer management
 */

/**
 * @swagger
 * /api/customers:
 *   post:
 *     tags: [Customers]
 *     summary: Create a new customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               phone:
 *                 type: string
 *               hashed_password:
 *                 type: string
 *               email:
 *                 type: string
 *               birth_date:
 *                 type: string
 *                 format: date
 *               gender_id:
 *                 type: integer
 *               lang_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Customer created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/customers', customerController.createCustomer);

/**
 * @swagger
 * /api/customers/search:
 *   get:
 *     tags: [Customers]
 *     summary: Search customers by first name, last name, or email
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Search query for first name, last name, or email
 *     responses:
 *       200:
 *         description: List of matching customers
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get('/customers/search', customerController.searchCustomers);

/**
 * @swagger
 * /api/customers:
 *   get:
 *     tags: [Customers]
 *     summary: Get all customers
 *     responses:
 *       200:
 *         description: List of customers
 *       500:
 *         description: Server error
 */
router.get('/customers', customerController.getCustomers);

/**
 * @swagger
 * /api/customers/{id}:
 *   get:
 *     tags: [Customers]
 *     summary: Get a customer by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Customer found
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Server error
 */
router.get('/customers/:id', customerController.getCustomerById);

/**
 * @swagger
 * /api/customers/{id}:
 *   put:
 *     tags: [Customers]
 *     summary: Update a customer by ID
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
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               phone:
 *                 type: string
 *               hashed_password:
 *                 type: string
 *               email:
 *                 type: string
 *               birth_date:
 *                 type: string
 *                 format: date
 *               gender_id:
 *                 type: integer
 *               lang_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Customer updated   successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put('/customers/:id', customerController.updateCustomer);

/**
 * @swagger
 * /api/customers/{id}:
 *   delete:
 *     tags: [Customers]
 *     summary: Delete a customer by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Customer deleted
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Server error
 */
router.delete('/customers/:id', customerController.deleteCustomer);

module.exports = router;