const express = require('express');
const router = express.Router();
const eventTypeController = require('../controllers/eventTypeController');

/**
 * @swagger
 * tags:
 *   name: EventTypes
 *   description: Event type management
 */

/**
 * @swagger
 * /api/event-types:
 *   post:
 *     tags: [EventTypes]
 *     summary: Create a new event type
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               parent_event_type_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: EventType created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/event-types', eventTypeController.createEventType);

/**
 * @swagger
 * /api/event-types/search:
 *   get:
 *     tags: [EventTypes]
 *     summary: Search event types
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of matching event types
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get('/event-types/search', eventTypeController.searchEventTypes);

/**
 * @swagger
 * /api/event-types:
 *   get:
 *     tags: [EventTypes]
 *     summary: Get all event types
 *     responses:
 *       200:
 *         description: List of event types
 *       500:
 *         description: Server error
 */
router.get('/event-types', eventTypeController.getEventTypes);

/**
 * @swagger
 * /api/event-types/{id}:
 *   get:
 *     tags: [EventTypes]
 *     summary: Get an event type by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: EventType found
 *       404:
 *         description: EventType not found
 *       500:
 *         description: Server error
 */
router.get('/event-types/:id', eventTypeController.getEventTypeById);

/**
 * @swagger
 * /api/event-types/{id}:
 *   put:
 *     tags: [EventTypes]
 *     summary: Update an event type by ID
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
 *               parent_event_type_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: EventType updated successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put('/event-types/:id', eventTypeController.updateEventType);

/**
 * @swagger
 * /api/event-types/{id}:
 *   delete:
 *     tags: [EventTypes]
 *     summary: Delete an event type by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: EventType deleted
 *       404:
 *         description: EventType not found
 *       500:
 *         description: Server error
 */
router.delete('/event-types/:id', eventTypeController.deleteEventType);

module.exports = router;
