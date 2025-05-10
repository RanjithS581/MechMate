import mongoose from "mongoose";

const RegisterSchema = new mongoose.Schema({
    userName : {
        type: String,
        required : true
    },
    email : {
        type: String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
})

const Register = mongoose.model('RegisterSchema', RegisterSchema)

export default Register