const express=require('express')
const { getTimeTable, createTimeTable, deleteTimeTable } = require('../controllers/timetable.controller')
const timetableRoute=express()
timetableRoute.get('/getTimeTable',getTimeTable)
timetableRoute.get('/getTimeTable/:id',getTimeTable)
timetableRoute.post('/createTimeTable',createTimeTable)
timetableRoute.delete('/deleteTimeTable/:id',deleteTimeTable)
module.exports=timetableRoute