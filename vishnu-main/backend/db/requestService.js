import mongoose from 'mongoose'

const requestService = new mongoose.Schema({
    user_id : {
        type: String,
        required : true
    },
    name : {
        type : String,
        required: true
    },
    email : {
        type: String,
        required : true
    },
    service : {
        type : String,
        required : true
    },
    specialRequest : {
        type: String,
        required:  false
    }
})

const AddBooking = mongoose.model('AddBooking', requestService)

export default AddBooking


