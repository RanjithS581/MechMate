import express from 'express'; // Use ES module import here
import Feedback from '../db/feedbackModels.js'; // Import the feedback model properly

const router = express.Router();

// Example route to handle feedback submission
router.post('/feedback', async (req, res) => {
    try {
        const { mechanicPhone, rating, comment } = req.body;
        const newFeedback = new Feedback({
            mechanicPhone,
            rating,
            comment,
        });

        await newFeedback.save();
        res.status(201).json({ message: 'Feedback submitted successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to submit feedback', error: err });
    }
});


// Route to get all feedbacks
router.get('/feedbacks', async (req, res) => {
  try {
    const feedbacks = await Feedback.find(); // Fetch all feedbacks from the database
    res.render('rating', { feedbacks }); // Render the rating.ejs page with feedbacks data
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve feedbacks" });
  }
});

export default router;

