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
});



const Courses = mongoose.model('Courses', coursesSchema);

module.exports = Courses;
