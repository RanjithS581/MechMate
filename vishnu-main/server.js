import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './backend/router/userRouter.js';
import adminRouter from './backend/router/adminRouter.js';
import feedbackRouter from './backend/router/feedbackRouter.js'; // Import feedbackRouter
import path from 'path';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { connectDB } from './backend/db/db.js';  // Assuming you have a connectDB function for MongoDB

const app = express();
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');

// Ensure proper file paths for views and static assets
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({ extended: true }));

// Set the views path correctly
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for feedback route
app.use('/api', feedbackRouter); // Add feedback routes here

// Connect to the database before starting the server
await connectDB(); // Connect to your MongoDB (assuming you have a utility function for that)

// Use routers for user and admin APIs
app.use(userRouter);
app.use('/api/admin', adminRouter);

// Render user login page
app.get('/login', (req, res) => {
    res.render('auth/userLogin'); // Ensure views/auth/userLogin.ejs exists
});

// Render the map page
app.get('/map', (req, res) => {
    res.render('user/map'); // Ensure views/user/map.ejs exists
});

// Render the rating page with mechanicPhone as a query param
app.get('/rating', (req, res) => {
    const mechanicPhone = req.query.mechanicPhone; // Retrieve mechanic phone number from URL query params
    res.render('user/rating', { mechanicPhone }); // Ensure views/rating.ejs exists
});

// Render the payment page with mechanicPhone as a query param
app.get('/payment', (req, res) => {
    const mechanicPhone = req.query.mechanicPhone; // Retrieve mechanic phone number from URL query params
    res.render('user/payment', { mechanicPhone }); // Ensure views/payment.ejs exists
});

// Connect to MongoDB (you can also move this logic to `connectDB` function)
mongoose.connect('mongodb://localhost:27017/feedbacks', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Start the server
// In your Express route
app.get('/rating', async (req, res) => {
    // Fetch all feedbacks from the database
    const feedbacks = await Feedback.find(); // Assuming you're using Mongoose or any other DB method
    res.render('rating', { feedbacks });
  });
  
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
});
