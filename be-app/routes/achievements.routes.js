const express = require('express')
const router = express.Router()
const { createAchievement} = require('../controllers/achievements.controller')

router.post('/:schoolId/createAchievments', createAchievement)

module.exports = router

