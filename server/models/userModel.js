const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    }
})
const abc = mongoose.model('abc',userSchema);
module.exports = abc;