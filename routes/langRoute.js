const express = require('express');
const router = express.Router();
const langController = require('../controllers/langController');

/**
 * @swagger
 * tags:
 *   name: Langs
 *   description: Lang management
 */

/**
 * @swagger
 * /api/langs:
 *   post:
 *     tags: [Langs]
 *     summary: Create a new lang
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
 *         description: Lang created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/langs', langController.createLang);

/**
 * @swagger
 * /api/langs/search:
 *   get:
 *     tags: [Langs]
 *     summary: Search langs
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of matching langs
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get('/langs/search', langController.searchLangs);

/**
 * @swagger
 * /api/langs:
 *   get:
 *     tags: [Langs]
 *     summary: Get all langs
 *     responses:
 *       200:
 *         description: List of langs
 *       500:
 *         description: Server error
 */
router.get('/langs', langController.getLangs);

/**
 * @swagger
 * /api/langs/{id}:
 *   get:
 *     tags: [Langs]
 *     summary: Get a lang by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lang found
 *       404:
 *         description: Lang not found
 *       500:
 *         description: Server error
 */
router.get('/langs/:id', langController.getLangById);

/**
 * @swagger
 * /api/langs/{id}:
 *   put:
 *     tags: [Langs]
 *     summary: Update a lang by ID
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
 *         description: Lang updated successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put('/langs/:id', langController.updateLang);

/**
 * @swagger
 * /api/langs/{id}:
 *   delete:
 *     tags: [Langs]
 *     summary: Delete a lang by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lang deleted
 *       404:
 *         description: Lang not found
 *       500:
 *         description: Server error
 */
router.delete('/langs/:id', langController.deleteLang);

module.exports = router;
