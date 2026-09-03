const express = require('express');
const router = express.Router();
const seatController = require('../controllers/seatController');

/**
 * @swagger
 * tags:
 *   name: Seats
 *   description: Seat management
 */

/**
 * @swagger
 * /api/seats:
 *   post:
 *     tags: [Seats]
 *     summary: Create a new seat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sector_id:
 *                 type: integer
 *               row_number:
 *                 type: integer
 *               number:
 *                 type: integer
 *               venue_id:
 *                 type: integer
 *               seat_type_id:
 *                 type: integer
 *               location_in_schema:
 *                 type: string
 *     responses:
 *       201:
 *         description: Seat created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/seats', seatController.createSeat);

/**
 * @swagger
 * /api/seats:
 *   get:
 *     tags: [Seats]
 *     summary: Get all seats
 *     responses:
 *       200:
 *         description: List of seats
 *       500:
 *         description: Server error
 */
router.get('/seats', seatController.getSeats);

/**
 * @swagger
 * /api/seats/venue/{venueId}:
 *   get:
 *     tags: [Seats]
 *     summary: Get all seats for a given venue
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of seats for the venue
 *       500:
 *         description: Server error
 */
router.get('/seats/venue/:venueId', seatController.getSeatsByVenue);

/**
 * @swagger
 * /api/seats/{id}:
 *   get:
 *     tags: [Seats]
 *     summary: Get a seat by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Seat found
 *       404:
 *         description: Seat not found
 *       500:
 *         description: Server error
 */
router.get('/seats/:id', seatController.getSeatById);

/**
 * @swagger
 * /api/seats/{id}:
 *   put:
 *     tags: [Seats]
 *     summary: Update a seat by ID
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
 *               sector_id:
 *                 type: integer
 *               row_number:
 *                 type: integer
 *               number:
 *                 type: integer
 *               venue_id:
 *                 type: integer
 *               seat_type_id:
 *                 type: integer
 *               location_in_schema:
 *                 type: string
 *     responses:
 *       200:
 *         description: Seat updated successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put('/seats/:id', seatController.updateSeat);

/**
 * @swagger
 * /api/seats/{id}:
 *   delete:
 *     tags: [Seats]
 *     summary: Delete a seat by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Seat deleted
 *       404:
 *         description: Seat not found
 *       500:
 *         description: Server error
 */
router.delete('/seats/:id', seatController.deleteSeat);

module.exports = router;
