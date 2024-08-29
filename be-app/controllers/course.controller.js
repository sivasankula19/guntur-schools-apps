const schoolAbout = require('../models/school-about.model')
const mongoose = require('mongoose');

const db = mongoose.connection



const createCourse = async (req, res) => {
  const { schoolId } = req.params;
  const courses = req.body;
  courses.schoolId = schoolId
  try {
    await schoolAbout.updateOne({ schoolId }, { $push: { courses: courses } });
    // await schoolAbout.updateOne({ schoolId }, { $push: { courses: { $each: courses } } }); //to push  arrays of multiple objects at once
    const data = await schoolAbout.find({ schoolId })
    const couresesData = data[0].courses
    res.status(200).json({ message: 'Courses saved successfully', couresesData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCourses = async (req, res) => {
  const { schoolId } = req.params;
  try {
    const data = await schoolAbout.find({ schoolId })
    const courses = data[0].courses
    console.log("data", data)
    return res.status(200).json(courses)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
module.exports = { createCourse, getCourses }