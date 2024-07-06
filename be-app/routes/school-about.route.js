const express = require('express');
const router = express.Router();
const { createSchoolAbout , getSchoolAbout, createTestinomals} = require('../controllers/school-about.controller');

//POST route to create a new SchoolAbout entry with schoolId in the URL
router.post('/:schoolId/about/create', createSchoolAbout);
router.get('/:schoolId/getAllAbout', getSchoolAbout);
router.post('/:schoolId/about/testimonials', createTestinomals);

module.exports = router;
