import mongoose from 'mongoose'

const bookingUser = new mongoose.Schema({
    user_id : {
        type: String,
        required : true
    },
    userName : {
        type : String,
        required: true
    },
    regno : {
        type: String,
        required: true
    },
    brand : {
        type: String,
        required: true
    },
    model : {
        type: String,
        required: true
    },
    userPhoneNumber : {
        type: String,
        required: true
    },
    status : {
        type: String,
        required: true
    },
    email : {
        type : String,
        required : true
    }
})

const UserBooking = mongoose.model('UserBooking', bookingUser)

export default UserBooking