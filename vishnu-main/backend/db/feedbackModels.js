import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  mechanicPhone: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  punctuality: {
    type: Number,
    required: true,
  },
  professionalism: {
    type: Number,
    required: true,
  },
  workQuality: {
    type: Number,
    required: true,
  },
  communication: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    default: '',
  },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// Use default export for the Feedback model
export default Feedback;
