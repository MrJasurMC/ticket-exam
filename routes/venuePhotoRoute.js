const express = require('express');
const router = express.Router();
const venuePhotoController = require('../controllers/venuePhotoController');

/**
 * @swagger
 * tags:
 *   name: VenuePhotos
 *   description: Venue photo management
 */

/**
 * @swagger
 * /api/venue-photos:
 *   post:
 *     tags: [VenuePhotos]
 *     summary: Create a new venue photo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               venueId:
 *                 type: integer
 *               url:
 *                 type: string
 *     responses:
 *       201:
 *         description: VenuePhoto created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/venue-photos', venuePhotoController.createVenuePhoto);

/**
 * @swagger
 * /api/venue-photos:
 *   get:
 *     tags: [VenuePhotos]
 *     summary: Get all venue photos
 *     responses:
 *       200:
 *         description: List of venue photos
 *       500:
 *         description: Server error
 */
router.get('/venue-photos', venuePhotoController.getVenuePhotos);

/**
 * @swagger
 * /api/venue-photos/{id}:
 *   get:
 *     tags: [VenuePhotos]
 *     summary: Get a venue photo by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: VenuePhoto found
 *       404:
 *         description: VenuePhoto not found
 *       500:
 *         description: Server error
 */
router.get('/venue-photos/:id', venuePhotoController.getVenuePhotoById);

/**
 * @swagger
 * /api/venue-photos/{id}:
 *   put:
 *     tags: [VenuePhotos]
 *     summary: Update a venue photo by ID
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
 *               url:
 *                 type: string
 *     responses:
 *       200:
 *         description: VenuePhoto updated successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put('/venue-photos/:id', venuePhotoController.updateVenuePhoto);

/**
 * @swagger
 * /api/venue-photos/{id}:
 *   delete:
 *     tags: [VenuePhotos]
 *     summary: Delete a venue photo by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: VenuePhoto deleted
 *       404:
 *         description: VenuePhoto not found
 *       500:
 *         description: Server error
 */
router.delete('/venue-photos/:id', venuePhotoController.deleteVenuePhoto);

module.exports = router;
