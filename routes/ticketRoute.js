const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

/**
 * @swagger
 * tags:
 *   name: Tickets
 *   description: Ticket management
 */

/**
 * @swagger
 * /api/tickets:
 *   post:
 *     tags: [Tickets]
 *     summary: Create a new ticket
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event_id:
 *                 type: integer
 *               seat_id:
 *                 type: integer
 *               price:
 *                 type: number
 *               service_fee:
 *                 type: number
 *               status_id:
 *                 type: integer
 *               ticket_type_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Ticket created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/tickets', ticketController.createTicket);

/**
 * @swagger
 * /api/tickets:
 *   get:
 *     tags: [Tickets]
 *     summary: Get all tickets
 *     responses:
 *       200:
 *         description: List of tickets
 *       500:
 *         description: Server error
 */
router.get('/tickets', ticketController.getTickets);

/**
 * @swagger
 * /api/tickets/event/{eventId}:
 *   get:
 *     tags: [Tickets]
 *     summary: Get all tickets for a given event
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of tickets for the event
 *       500:
 *         description: Server error
 */
router.get('/tickets/event/:eventId', ticketController.getTicketsByEvent);

/**
 * @swagger
 * /api/tickets/{id}:
 *   get:
 *     tags: [Tickets]
 *     summary: Get a ticket by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ticket found
 *       404:
 *         description: Ticket not found
 *       500:
 *         description: Server error
 */
router.get('/tickets/:id', ticketController.getTicketById);

/**
 * @swagger
 * /api/tickets/{id}:
 *   put:
 *     tags: [Tickets]
 *     summary: Update a ticket by ID
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
 *               event_id:
 *                 type: integer
 *               seat_id:
 *                 type: integer
 *               price:
 *                 type: number
 *               service_fee:
 *                 type: number
 *               status_id:
 *                 type: integer
 *               ticket_type_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Ticket updated successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put('/tickets/:id', ticketController.updateTicket);

/**
 * @swagger
 * /api/tickets/{id}:
 *   delete:
 *     tags: [Tickets]
 *     summary: Delete a ticket by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ticket deleted
 *       404:
 *         description: Ticket not found
 *       500:
 *         description: Server error
 */
router.delete('/tickets/:id', ticketController.deleteTicket);

module.exports = router;
