const express = require('express');
const router = express.Router();
const ticketTypeController = require('../controllers/ticketTypeController');

/**
 * @swagger
 * tags:
 *   name: TicketTypes
 *   description: TicketType management
 */

/**
 * @swagger
 * /api/ticket-types:
 *   post:
 *     tags: [TicketTypes]
 *     summary: Create a new tickettype
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
*               ticket_type:
*                 type: string
 *     responses:
 *       201:
 *         description: TicketType created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/ticket-types', ticketTypeController.createTicketType);

/**
 * @swagger
 * /api/ticket-types/search:
 *   get:
 *     tags: [TicketTypes]
 *     summary: Search tickettypes
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of matching tickettypes
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get('/ticket-types/search', ticketTypeController.searchTicketTypes);

/**
 * @swagger
 * /api/ticket-types:
 *   get:
 *     tags: [TicketTypes]
 *     summary: Get all tickettypes
 *     responses:
 *       200:
 *         description: List of tickettypes
 *       500:
 *         description: Server error
 */
router.get('/ticket-types', ticketTypeController.getTicketTypes);

/**
 * @swagger
 * /api/ticket-types/{id}:
 *   get:
 *     tags: [TicketTypes]
 *     summary: Get a tickettype by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: TicketType found
 *       404:
 *         description: TicketType not found
 *       500:
 *         description: Server error
 */
router.get('/ticket-types/:id', ticketTypeController.getTicketTypeById);

/**
 * @swagger
 * /api/ticket-types/{id}:
 *   put:
 *     tags: [TicketTypes]
 *     summary: Update a tickettype by ID
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
*               ticket_type:
*                 type: string
 *     responses:
 *       200:
 *         description: TicketType updated successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put('/ticket-types/:id', ticketTypeController.updateTicketType);

/**
 * @swagger
 * /api/ticket-types/{id}:
 *   delete:
 *     tags: [TicketTypes]
 *     summary: Delete a tickettype by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: TicketType deleted
 *       404:
 *         description: TicketType not found
 *       500:
 *         description: Server error
 */
router.delete('/ticket-types/:id', ticketTypeController.deleteTicketType);

module.exports = router;
