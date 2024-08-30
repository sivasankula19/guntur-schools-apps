const express = require('express')
const router = express.Router()
const { createAchievement, getAchievement } = require('../controllers/achievements.controller')

router.post('/:schoolId/createAchievments', createAchievement)
router.get('/:schoolId/getAchievments', getAchievement)

module.exports = router

