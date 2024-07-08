const mongoose=require('mongoose')
const timeTableModel=new mongoose.Schema({
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true
      },
    class_id:{
        type:String,
        required:true
    },
    data:{
        type:Object,
        required:true
    }
})
const timeTable=mongoose.model('timetable',timeTableModel)
module.exports=timeTable