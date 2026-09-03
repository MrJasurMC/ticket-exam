const express = require('express');
const router = express.Router();
const sectorController = require('../controllers/sectorController');

/**
 * @swagger
 * tags:
 *   name: Sectors
 *   description: Sector management
 */

/**
 * @swagger
 * /api/sectors:
 *   post:
 *     tags: [Sectors]
 *     summary: Create a new sector
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
*               sector_name:
*                 type: string
 *     responses:
 *       201:
 *         description: Sector created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/sectors', sectorController.createSector);

/**
 * @swagger
 * /api/sectors/search:
 *   get:
 *     tags: [Sectors]
 *     summary: Search sectors
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of matching sectors
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get('/sectors/search', sectorController.searchSectors);

/**
 * @swagger
 * /api/sectors:
 *   get:
 *     tags: [Sectors]
 *     summary: Get all sectors
 *     responses:
 *       200:
 *         description: List of sectors
 *       500:
 *         description: Server error
 */
router.get('/sectors', sectorController.getSectors);

/**
 * @swagger
 * /api/sectors/{id}:
 *   get:
 *     tags: [Sectors]
 *     summary: Get a sector by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sector found
 *       404:
 *         description: Sector not found
 *       500:
 *         description: Server error
 */
router.get('/sectors/:id', sectorController.getSectorById);

/**
 * @swagger
 * /api/sectors/{id}:
 *   put:
 *     tags: [Sectors]
 *     summary: Update a sector by ID
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
*               sector_name:
*                 type: string
 *     responses:
 *       200:
 *         description: Sector updated successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put('/sectors/:id', sectorController.updateSector);

/**
 * @swagger
 * /api/sectors/{id}:
 *   delete:
 *     tags: [Sectors]
 *     summary: Delete a sector by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sector deleted
 *       404:
 *         description: Sector not found
 *       500:
 *         description: Server error
 */
router.delete('/sectors/:id', sectorController.deleteSector);

module.exports = router;
