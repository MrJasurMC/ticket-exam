const express = require('express');
const router = express.Router();
const ticketStatusController = require('../controllers/ticketStatusController');

/**
 * @swagger
 * tags:
 *   name: TicketStatuss
 *   description: TicketStatus management
 */

/**
 * @swagger
 * /api/ticket-statuses:
 *   post:
 *     tags: [TicketStatuss]
 *     summary: Create a new ticketstatus
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
 *         description: TicketStatus created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/ticket-statuses', ticketStatusController.createTicketStatus);

/**
 * @swagger
 * /api/ticket-statuses/search:
 *   get:
 *     tags: [TicketStatuss]
 *     summary: Search ticketstatuss
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of matching ticketstatuss
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get('/ticket-statuses/search', ticketStatusController.searchTicketStatuss);

/**
 * @swagger
 * /api/ticket-statuses:
 *   get:
 *     tags: [TicketStatuss]
 *     summary: Get all ticketstatuss
 *     responses:
 *       200:
 *         description: List of ticketstatuss
 *       500:
 *         description: Server error
 */
router.get('/ticket-statuses', ticketStatusController.getTicketStatuss);

/**
 * @swagger
 * /api/ticket-statuses/{id}:
 *   get:
 *     tags: [TicketStatuss]
 *     summary: Get a ticketstatus by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: TicketStatus found
 *       404:
 *         description: TicketStatus not found
 *       500:
 *         description: Server error
 */
router.get('/ticket-statuses/:id', ticketStatusController.getTicketStatusById);

/**
 * @swagger
 * /api/ticket-statuses/{id}:
 *   put:
 *     tags: [TicketStatuss]
 *     summary: Update a ticketstatus by ID
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
 *         description: TicketStatus updated successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put('/ticket-statuses/:id', ticketStatusController.updateTicketStatus);

/**
 * @swagger
 * /api/ticket-statuses/{id}:
 *   delete:
 *     tags: [TicketStatuss]
 *     summary: Delete a ticketstatus by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: TicketStatus deleted
 *       404:
 *         description: TicketStatus not found
 *       500:
 *         description: Server error
 */
router.delete('/ticket-statuses/:id', ticketStatusController.deleteTicketStatus);

module.exports = router;
