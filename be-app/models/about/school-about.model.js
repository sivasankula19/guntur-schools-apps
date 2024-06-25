const mongoose = require('mongoose');

const schoolAboutSchema = new mongoose.Schema({
  schoolId : {
   type : mongoose.Schema.Types.ObjectId,
   ref : 'School',
   required : true
  },
  about: {
    type: String,
    required: true,
  },
  mission : {
    type: String,
    required: true,
  },
  vision : {
    type: String,
    required: true,
  },
  establishedDate : {
    type : Date,
    required: true,
  },
  location : {
    type : String,
    required: true,
  },
  staffCount : {
    type : Number,
    required: true,
  },
  studentCount : {
    type : Number,
    required: true,
  },
  facilities : {
    type : [String],
    required : true
  },
  achievements : {
    type : [String],
    required : true
  },
  recognizations : {
    type : [String],
    required : true
  },
  studentTestinomals : {
    type : [Object],
    required : true
  }
});

const User = mongoose.model('SchoolAbout', schoolAboutSchema);

module.exports = User;
