import mongoose from 'mongoose'

const userDetail = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    }
})

const User = mongoose.model('userDetail', bookingUser)

export default User