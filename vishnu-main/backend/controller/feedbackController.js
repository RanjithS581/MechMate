// controller/feedbackController.js
import Feedback from '../db/feedbackModel';
import mongoose from 'mongoose';
import { response } from 'express';

const Feedback = require('../db/feedbackModel'); // Import the Feedback model

// Handle feedback submission
const submitFeedback = async (req, res) => {
  const { mechanicPhone, rating, punctuality, professionalism, workQuality, communication, review } = req.body;

  try {
    // Create a new feedback entry
    const feedback = new Feedback({
      mechanicPhone,
      rating,
      punctuality,
      professionalism,
      workQuality,
      communication,
      review,
    });

    // Save the feedback to the database
    await feedback.save();

    // Send a success response
    res.status(201).json({ message: 'Feedback submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while submitting feedback.' });
  }
};

module.exports = {
  submitFeedback,
};
