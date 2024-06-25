const express = require('express');
const router = express.Router();
const { createCourse } = require('../../controllers/course/course.controller');

// POST route to create a new School
router.post('/:schoolId/createCourse', createCourse);

module.exports = router;
