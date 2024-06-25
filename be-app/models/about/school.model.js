const mongoose = require('mongoose');
const schoolSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    }
})

const School = mongoose.model('school',schoolSchema );
module.exports = School
