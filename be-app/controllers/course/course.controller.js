const Courses = require('../../models/courses/courses.model')
const mongoose = require('mongoose');

const db = mongoose.connection



  const createCourse = async (req, res) => {
    const { schoolId } = req.params;
    const  courses  = req.body;

    courses.forEach(element => {
      element.schoolId = schoolId
    });

    try {
      await Courses.insertMany(courses)
      res.status(200).json({ message: 'Courses saved successfully', courses });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const getCourses = async(req,res) => {
    const { schoolId } = req.params;
    try{
      const coursesList = await Courses.find({schoolId})
      return res.status(200).json(coursesList)
    } catch(err){
      res.status(500).json({error : err.message})
    }
  }
  module.exports = {createCourse, getCourses}