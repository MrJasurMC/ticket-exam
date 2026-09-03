const express = require('express');
const router = express.Router();
const venueTypesController = require('../controllers/venueTypesController');

/**
 * @swagger
 * tags:
 *   name: VenueTypes
 *   description: Venue-Types join management
 */

/**
 * @swagger
 * /api/venue-types:
 *   post:
 *     tags: [VenueTypes]
 *     summary: Create a new venue-type link
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               venueId:
 *                 type: integer
 *               typeId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: VenueTypes created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/venue-types', venueTypesController.createVenueTypes);

/**
 * @swagger
 * /api/venue-types:
 *   get:
 *     tags: [VenueTypes]
 *     summary: Get all venue-type links
 *     responses:
 *       200:
 *         description: List of venue-type links
 *       500:
 *         description: Server error
 */
router.get('/venue-types', venueTypesController.getVenueTypess);

/**
 * @swagger
 * /api/venue-types/{id}:
 *   get:
 *     tags: [VenueTypes]
 *     summary: Get a venue-type link by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: VenueTypes found
 *       404:
 *         description: VenueTypes not found
 *       500:
 *         description: Server error
 */
router.get('/venue-types/:id', venueTypesController.getVenueTypesById);

/**
 * @swagger
 * /api/venue-types/{id}:
 *   put:
 *     tags: [VenueTypes]
 *     summary: Update a venue-type link by ID
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
 *               venueId:
 *                 type: integer
 *               typeId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: VenueTypes updated successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put('/venue-types/:id', venueTypesController.updateVenueTypes);

/**
 * @swagger
 * /api/venue-types/{id}:
 *   delete:
 *     tags: [VenueTypes]
 *     summary: Delete a venue-type link by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: VenueTypes deleted
 *       404:
 *         description: VenueTypes not found
 *       500:
 *         description: Server error
 */
router.delete('/venue-types/:id', venueTypesController.deleteVenueTypes);

module.exports = router;
