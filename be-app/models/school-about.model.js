const mongoose = require('mongoose');
const uuid = require('uuid')

const schoolAboutSchema = new mongoose.Schema({
  schoolId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'School',
    required : true
   },

  schoolAbout : {
    schoolAboutId : {
      type: String,
      default:  uuid.v4
    },
  about: {
    type: String,
    
  },
  mission : {
    type: String,

  },
  vision : {
    type: String,
   
  },
  establishedDate : {
    type : Date,
    
  },
  location : {
    type : String,
    
  },
  staffCount : {
    type : Number,
    
  },
  studentCount : {
    type : Number,
    
  },
  facilities : {
    type : [String],
    
  },
  achievements : {
    type : [String],
    
  },
  recognizations : {
    type : [String],
    
  },
  studentTestinomals : {
    type : [Object],
  }
},

requestList: [
  {

    studentName: {
      type: String,
      required: true
    },
    comments: {
      type: String,
      required: true
    }
  }
],
principalContact: {
  name: {
    type: String
  },
  email: {
    type: String
  },
  phoneNumber : {
      type:Number
  }
},
schoolContact: {
 
  name: {
    type: String
  },
  email: {
    type: String
  },
  phoneNumber : {
      type:Number
  }
},
courses : [{
  courseName: {
    type : String, 
    required : true,
    unique: true
  },
  isEm: Boolean,
  isTm: Boolean
}]
});

const User = mongoose.model('SchoolAbout', schoolAboutSchema);

module.exports = User;
