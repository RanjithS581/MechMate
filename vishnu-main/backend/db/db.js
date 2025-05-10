import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://siva:12345@cluster0.oenae.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("Successfully connected to MongoDB Atlas");
    } catch (error) {
        console.error("Error in database connection:", error);
    }
};

export { connectDB };
