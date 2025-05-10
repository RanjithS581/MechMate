import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    email : {
        type: String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})

const adminLogin = mongoose.model('adminSchema', adminSchema)

export default adminLogin