const Courses = require('../../models/courses/courses.model')
const mongoose = require('mongoose');

const db = mongoose.connection



  const createCourse = async (req, res) => {
    const { schoolId } = req.params;
    const  courses  = req.body;


    courses.forEach(element => {
      element.schoolId = schoolId
    });

    console.log("courses",courses)
    // await Courses.collection.drop();

    try {

      await Courses.insertMany(courses)

    //   const updatedSchoolAbout = await Courses.findOneAndUpdate(
    //     { schoolId }, 
    //     { $set: { courses: courses } },
    //     { upsert: true, new: true },
    // );


      // Update existing courses and insert new courses
      // const bulkOps = courses.map(course => ({
      //   updateOne: {
      //     filter: { schoolId, courseName: course.courseName }, // Match existing courses by schoolId and courseName
      //     update: { $set: { ...course, schoolId } },
      //     upsert: true // Create new document if no match is found
      //   }
      // }));
      // console.log("bulkOps:", JSON.stringify(bulkOps, null, 2));
     // Insert courses into the database
    
    // const result = await Courses.insertMany(courses);
  
      //const result = await Courses.bulkWrite(bulkOps);
  
      res.status(200).json({ message: 'Courses saved successfully', courses });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  module.exports = {createCourse}