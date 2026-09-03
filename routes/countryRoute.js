const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countryController');

/**
 * @swagger
 * tags:
 *   name: Countries
 *   description: Country management
 */

/**
 * @swagger
 * /api/countries:
 *   post:
 *     tags: [Countries]
 *     summary: Create a new country
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
*               country_name:
*                 type: string
 *     responses:
 *       201:
 *         description: Country created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/countries', countryController.createCountry);

/**
 * @swagger
 * /api/countries/search:
 *   get:
 *     tags: [Countries]
 *     summary: Search countrys
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of matching countrys
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
router.get('/countries/search', countryController.searchCountries);

/**
 * @swagger
 * /api/countries:
 *   get:
 *     tags: [Countries]
 *     summary: Get all countrys
 *     responses:
 *       200:
 *         description: List of countrys
 *       500:
 *         description: Server error
 */
router.get('/countries', countryController.getCountries);

/**
 * @swagger
 * /api/countries/{id}:
 *   get:
 *     tags: [Countries]
 *     summary: Get a country by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Country found
 *       404:
 *         description: Country not found
 *       500:
 *         description: Server error
 */
router.get('/countries/:id', countryController.getCountryById);

/**
 * @swagger
 * /api/countries/{id}:
 *   put:
 *     tags: [Countries]
 *     summary: Update a country by ID
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
*               country_name:
*                 type: string
 *     responses:
 *       200:
 *         description: Country updated successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put('/countries/:id', countryController.updateCountry);

/**
 * @swagger
 * /api/countries/{id}:
 *   delete:
 *     tags: [Countries]
 *     summary: Delete a country by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Country deleted
 *       404:
 *         description: Country not found
 *       500:
 *         description: Server error
 */
router.delete('/countries/:id', countryController.deleteCountry);

module.exports = router;
