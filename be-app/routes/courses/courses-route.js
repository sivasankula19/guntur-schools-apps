const express = require('express');
const router = express.Router();
const { createCourse, getCourses } = require('../../controllers/course/course.controller');

// POST route to create a new School
router.post('/:schoolId/createCourse', createCourse);
router.get('/:schoolId/getCourses', getCourses)

module.exports = router;
