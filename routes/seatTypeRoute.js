const express = require('express');
const router = express.Router();
const seatTypeController = require('../controllers/seatTypeController');

/**
 * @swagger
 * tags:
 *   name: SeatTypes
 *   description: SeatType management
 */

/**
 * @swagger
 * /api/seat-types:
 *   post:
 *     tags: [SeatTypes]
 *     summary: Create a new seattype
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
 *         description: SeatType created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/seat-types', seatTypeController.createSeatType);

/**
 * @swagger
 * /api/seat-types/search:
 *   get:
 *     tags: [SeatTypes]
 *     summary: Search seattypes
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of matching seattypes
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get('/seat-types/search', seatTypeController.searchSeatTypes);

/**
 * @swagger
 * /api/seat-types:
 *   get:
 *     tags: [SeatTypes]
 *     summary: Get all seattypes
 *     responses:
 *       200:
 *         description: List of seattypes
 *       500:
 *         description: Server error
 */
router.get('/seat-types', seatTypeController.getSeatTypes);

/**
 * @swagger
 * /api/seat-types/{id}:
 *   get:
 *     tags: [SeatTypes]
 *     summary: Get a seattype by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: SeatType found
 *       404:
 *         description: SeatType not found
 *       500:
 *         description: Server error
 */
router.get('/seat-types/:id', seatTypeController.getSeatTypeById);

/**
 * @swagger
 * /api/seat-types/{id}:
 *   put:
 *     tags: [SeatTypes]
 *     summary: Update a seattype by ID
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
 *         description: SeatType updated successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put('/seat-types/:id', seatTypeController.updateSeatType);

/**
 * @swagger
 * /api/seat-types/{id}:
 *   delete:
 *     tags: [SeatTypes]
 *     summary: Delete a seattype by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: SeatType deleted
 *       404:
 *         description: SeatType not found
 *       500:
 *         description: Server error
 */
router.delete('/seat-types/:id', seatTypeController.deleteSeatType);

module.exports = router;
