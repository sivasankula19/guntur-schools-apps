const express = require('express')
const router = express.Router()
const { createCompetition } = require('../controllers/competitions.controller')

router.post('/:schoolId/createCompetitions', createCompetition)

module.exports = router
