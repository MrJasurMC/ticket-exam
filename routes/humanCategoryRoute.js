const express = require('express');
const router = express.Router();
const humanCategoryController = require('../controllers/humanCategoryController');

/**
 * @swagger
 * tags:
 *   name: HumanCategories
 *   description: Human category management
 */

/**
 * @swagger
 * /api/human-categories:
 *   post:
 *     tags: [HumanCategories]
 *     summary: Create a new human category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               start_age:
 *                 type: integer
 *               finish_age:
 *                 type: integer
 *               gender_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: HumanCategory created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/human-categories', humanCategoryController.createHumanCategory);

/**
 * @swagger
 * /api/human-categories/search:
 *   get:
 *     tags: [HumanCategories]
 *     summary: Search human categories
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of matching human categories
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get('/human-categories/search', humanCategoryController.searchHumanCategorys);

/**
 * @swagger
 * /api/human-categories:
 *   get:
 *     tags: [HumanCategories]
 *     summary: Get all human categories
 *     responses:
 *       200:
 *         description: List of human categories
 *       500:
 *         description: Server error
 */
router.get('/human-categories', humanCategoryController.getHumanCategorys);

/**
 * @swagger
 * /api/human-categories/{id}:
 *   get:
 *     tags: [HumanCategories]
 *     summary: Get a human category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: HumanCategory found
 *       404:
 *         description: HumanCategory not found
 *       500:
 *         description: Server error
 */
router.get('/human-categories/:id', humanCategoryController.getHumanCategoryById);

/**
 * @swagger
 * /api/human-categories/{id}:
 *   put:
 *     tags: [HumanCategories]
 *     summary: Update a human category by ID
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
 *               start_age:
 *                 type: integer
 *               finish_age:
 *                 type: integer
 *               gender_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: HumanCategory updated successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put('/human-categories/:id', humanCategoryController.updateHumanCategory);

/**
 * @swagger
 * /api/human-categories/{id}:
 *   delete:
 *     tags: [HumanCategories]
 *     summary: Delete a human category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: HumanCategory deleted
 *       404:
 *         description: HumanCategory not found
 *       500:
 *         description: Server error
 */
router.delete('/human-categories/:id', humanCategoryController.deleteHumanCategory);

module.exports = router;
