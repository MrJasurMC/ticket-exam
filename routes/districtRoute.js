const express = require('express');
const router = express.Router();
const districtController = require('../controllers/districtController');

/**
 * @swagger
 * tags:
 *   name: Districts
 *   description: District management
 */

/**
 * @swagger
 * /api/districts:
 *   post:
 *     tags: [Districts]
 *     summary: Create a new district
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
*               name:
*                 type: string
*               region_id:
*                 type: integer
 *     responses:
 *       201:
 *         description: District created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/districts', districtController.createDistrict);

/**
 * @swagger
 * /api/districts/search:
 *   get:
 *     tags: [Districts]
 *     summary: Search districts
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of matching districts
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get('/districts/search', districtController.searchDistricts);

/**
 * @swagger
 * /api/districts:
 *   get:
 *     tags: [Districts]
 *     summary: Get all districts
 *     responses:
 *       200:
 *         description: List of districts
 *       500:
 *         description: Server error
 */
router.get('/districts', districtController.getDistricts);

/**
 * @swagger
 * /api/districts/{id}:
 *   get:
 *     tags: [Districts]
 *     summary: Get a district by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: District found
 *       404:
 *         description: District not found
 *       500:
 *         description: Server error
 */
router.get('/districts/:id', districtController.getDistrictById);

/**
 * @swagger
 * /api/districts/{id}:
 *   put:
 *     tags: [Districts]
 *     summary: Update a district by ID
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
*               region_id:
*                 type: integer
 *     responses:
 *       200:
 *         description: District updated successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put('/districts/:id', districtController.updateDistrict);

/**
 * @swagger
 * /api/districts/{id}:
 *   delete:
 *     tags: [Districts]
 *     summary: Delete a district by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: District deleted
 *       404:
 *         description: District not found
 *       500:
 *         description: Server error
 */
router.delete('/districts/:id', districtController.deleteDistrict);

module.exports = router;
