const mongoose = require('mongoose');
const classSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    section:{
        type : String,
        required : true
    },
    class_id:{
            type : String,
            required : true
    }
})

const schoolClasses = mongoose.model('schoolclass',classSchema );
module.exports = schoolClasses
