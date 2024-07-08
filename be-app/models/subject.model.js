const mongoose=require('mongoose')
const { type } = require('os')
const subject=new mongoose.Schema(
    {  
        schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true
      },
        name:{
            type:String,
            required:true
        },
        subject_id:{
            type:String,
            required:true
        }
    }
)
const Subject=mongoose.model('subject',subject)
module.exports=Subject