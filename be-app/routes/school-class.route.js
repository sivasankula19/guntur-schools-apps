const express=require('express')
const { getClass, createClass } = require('../controllers/school-class.controller')
const classRoute=express()
classRoute.get('/getClasses',getClass)
classRoute.post('/createClass',createClass)

module.exports=classRoute