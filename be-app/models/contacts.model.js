// models/contacts.model.js
const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true
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
  }
});
const Contacts = mongoose.model('Contacts', ContactSchema);
module.exports = Contacts;