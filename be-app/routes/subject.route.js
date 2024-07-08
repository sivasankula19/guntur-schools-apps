const express=require('express')
const { getSubject, createSubject } = require('../controllers/subject.contoller')
const subjectRoute=express()
subjectRoute.get('/getSubjects',getSubject)
subjectRoute.post('/createSubject',createSubject)
module.exports=subjectRoute