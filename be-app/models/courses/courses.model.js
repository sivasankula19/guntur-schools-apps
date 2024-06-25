const mongoose = require('mongoose');

const coursesSchema = new mongoose.Schema({

  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true
  },
  courseName: {
    type : String, 
    required : true,
    unique: true
  },
  isEm: Boolean,
  isTm: Boolean

  // schoolId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'School', 
  //   required: true
  // },

  // courses: [{
  //   courseName: String,
  //   isEm: Boolean,
  //   isTm: Boolean,
  // }]

  // courseId: {
  //   type: Number,
  //   unique: true,
  //   required: true
  // },
  // courseName: {
  //   type: String,
  //   required: true,

  // },
  // isEm: {
  //   type: Boolean,
  //   default: false
  // },
  // isTm: {
  //   type: Boolean,
  //   default: false
  // }
});



const Courses = mongoose.model('Courses', coursesSchema);

module.exports = Courses;
