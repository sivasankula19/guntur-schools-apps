const express = require('express');
const router = express.Router();
const { createSchool } = require('../controllers/school.controller');

// POST route to create a new School
router.post('/createSchool', createSchool);

module.exports = router;
