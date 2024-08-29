const mongoose = require('mongoose');
const { type } = require('os');
const uuid = require('uuid')

const schoolAboutSchema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true
  },

  schoolAbout: {
    schoolAboutId: {
      type: String,
      default: uuid.v4
    },
    about: {
      type: String,

    },
    mission: {
      type: String,

    },
    vision: {
      type: String,
    },
    establishedDate: {
      type: Date,

    },
    location: {
      type: String,

    },
    staffCount: {
      type: Number,

    },
    studentCount: {
      type: Number,

    },
    facilities: {
      type: [String],

    },
    achievements: {
      type: [String],

    },
    recognizations: {
      type: [String],

    },
    studentTestinomals: {
      type: [Object],
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
    phoneNumber: {
      type: Number
    },
    location: {
      type: String
    },
    qualification: {
      type: String
    }
  },
  schoolContact: {
    email: {
      type: String
    },
    phoneNumber: {
      type: Number
    },
    pinCode: {
      type: Number
    },
    district: {
      type: String
    },
    town: {
      type: String
    },
    city: {
      type: String
    },
    address: {
      type: String
    }

  },
  courses: [{
    courseName: {
      type: String,
      required: true,
      unique: true
    },
    isEm: Boolean,
    isTm: Boolean
  }],
  competitions: {
    type: Map,
    of: [{
      eventName: String,
      category: String
    }],
    default: {}
  },

  achievements: {
    type: Object,
    default: {}
  }

  // achievements: {
  //   type : Map,
  //   of : new mongoose.Schema({
  //     type : Map,
  //     of : {
  //       type : [Object],    //we can also write of:[{subcategory: string, category : string, eventName : string}]
  //       default: []
  //     }

  //   }),
  //   default : {}
  // },
  // achievements: {
  //   education: {
  //     schoolLevel : {
  //     type: [Object],
  //     },
  //     mandalLevel : {
  //       type : [Object]
  //     },
  //     districtLevel : {
  //       type: [Object]
  //     }

  //   },
  //   sports: {
  //     schoolLevel : {
  //       type: [Object],
  //       },
  //       mandalLevel : {
  //         type : [Object]
  //       },
  //       districtLevel : {
  //         type: [Object]
  //       }
  //   }
  // }
});

const User = mongoose.model('SchoolAbout', schoolAboutSchema);

module.exports = User;
