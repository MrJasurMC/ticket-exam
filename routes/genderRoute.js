const express = require('express');
const router = express.Router();
const genderController = require('../controllers/genderController');

/**
 * @swagger
 * tags:
 *   name: Genders
 *   description: Gender management
 */

/**
 * @swagger
 * /api/genders:
 *   post:
 *     tags: [Genders]
 *     summary: Create a new gender
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
 *         description: Gender created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/genders', genderController.createGender);

/**
 * @swagger
 * /api/genders/search:
 *   get:
 *     tags: [Genders]
 *     summary: Search genders
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of matching genders
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get('/genders/search', genderController.searchGenders);

/**
 * @swagger
 * /api/genders:
 *   get:
 *     tags: [Genders]
 *     summary: Get all genders
 *     responses:
 *       200:
 *         description: List of genders
 *       500:
 *         description: Server error
 */
router.get('/genders', genderController.getGenders);

/**
 * @swagger
 * /api/genders/{id}:
 *   get:
 *     tags: [Genders]
 *     summary: Get a gender by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Gender found
 *       404:
 *         description: Gender not found
 *       500:
 *         description: Server error
 */
router.get('/genders/:id', genderController.getGenderById);

/**
 * @swagger
 * /api/genders/{id}:
 *   put:
 *     tags: [Genders]
 *     summary: Update a gender by ID
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
 *         description: Gender updated successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put('/genders/:id', genderController.updateGender);

/**
 * @swagger
 * /api/genders/{id}:
 *   delete:
 *     tags: [Genders]
 *     summary: Delete a gender by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Gender deleted
 *       404:
 *         description: Gender not found
 *       500:
 *         description: Server error
 */
router.delete('/genders/:id', genderController.deleteGender);

module.exports = router;
