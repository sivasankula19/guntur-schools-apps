const express = require('express')
const router = express.Router()
const { createCompetition, getCompetitions } = require('../controllers/competitions.controller')

router.post('/:schoolId/createCompetitions', createCompetition);
router.get('/:schoolId/getCompetitions', getCompetitions)

module.exports = router
