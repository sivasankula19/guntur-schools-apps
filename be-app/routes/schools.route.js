const express = require('express');
const router = express.Router();
const { createSchool,getSchools } = require('../controllers/school.controller');

// POST route to create a new School
router.post('/createSchool', createSchool);
router.get('/getAllSchools',getSchools)

module.exports = router;
