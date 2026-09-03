const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

/**
 * @swagger
 * /api/admins/login:
 *   post:
 *     tags: [Admins]
 *     summary: Admin login, returns a JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, token returned
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Invalid credentials
 */
router.post('/admins/login', adminController.login);

/**
 * @swagger
 * tags:
 *   name: Admins
 *   description: Admin management
 */

/**
 * @swagger
 * /api/admins:
 *   post:
 *     tags: [Admins]
 *     summary: Create a new admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               login:
 *                 type: string
 *               hashed_password:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *               is_creator:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Admin created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/admins', adminController.createAdmin);

/**
 * @swagger
 * /api/admins/search:
 *   get:
 *     tags: [Admins]
 *     summary: Search admins by name or login
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of matching admins
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get('/admins/search', adminController.searchAdmins);

/**
 * @swagger
 * /api/admins:
 *   get:
 *     tags: [Admins]
 *     summary: Get all admins
 *     responses:
 *       200:
 *         description: List of admins
 *       500:
 *         description: Server error
 */
router.get('/admins', adminController.getAdmins);

/**
 * @swagger
 * /api/admins/{id}:
 *   get:
 *     tags: [Admins]
 *     summary: Get an admin by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Admin found
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Server error
 */
router.get('/admins/:id', adminController.getAdminById);

/**
 * @swagger
 * /api/admins/{id}:
 *   put:
 *     tags: [Admins]
 *     summary: Update an admin by ID
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
 *               login:
 *                 type: string
 *               hashed_password:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *               is_creator:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Admin updated successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put('/admins/:id', adminController.updateAdmin);

/**
 * @swagger
 * /api/admins/{id}:
 *   delete:
 *     tags: [Admins]
 *     summary: Delete an admin by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Admin deleted
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Server error
 */
router.delete('/admins/:id', adminController.deleteAdmin);

module.exports = router;
