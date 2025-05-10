import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema({
    service : String,
})

const ServiceList = mongoose.model('ServiceList', serviceSchema)

export default ServiceList