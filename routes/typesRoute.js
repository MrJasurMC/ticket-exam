const express = require('express');
const router = express.Router();
const typesController = require('../controllers/typesController');

/**
 * @swagger
 * tags:
 *   name: Typess
 *   description: Types management
 */

/**
 * @swagger
 * /api/types:
 *   post:
 *     tags: [Typess]
 *     summary: Create a new types
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
 *         description: Types created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/types', typesController.createTypes);

/**
 * @swagger
 * /api/types/search:
 *   get:
 *     tags: [Typess]
 *     summary: Search typess
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of matching typess
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get('/types/search', typesController.searchTypess);

/**
 * @swagger
 * /api/types:
 *   get:
 *     tags: [Typess]
 *     summary: Get all typess
 *     responses:
 *       200:
 *         description: List of typess
 *       500:
 *         description: Server error
 */
router.get('/types', typesController.getTypess);

/**
 * @swagger
 * /api/types/{id}:
 *   get:
 *     tags: [Typess]
 *     summary: Get a types by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Types found
 *       404:
 *         description: Types not found
 *       500:
 *         description: Server error
 */
router.get('/types/:id', typesController.getTypesById);

/**
 * @swagger
 * /api/types/{id}:
 *   put:
 *     tags: [Typess]
 *     summary: Update a types by ID
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
 *         description: Types updated successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put('/types/:id', typesController.updateTypes);

/**
 * @swagger
 * /api/types/{id}:
 *   delete:
 *     tags: [Typess]
 *     summary: Delete a types by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Types deleted
 *       404:
 *         description: Types not found
 *       500:
 *         description: Server error
 */
router.delete('/types/:id', typesController.deleteTypes);

module.exports = router;
