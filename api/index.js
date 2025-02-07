import express from 'express';
import mongoose from 'mongoose';
import process from 'process';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process if MongoDB fails to connect
    }
};

// Start the connection before running the server
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware should be used before defining routes
app.use(cors());
app.use(express.json());

// Define routes after middleware
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

// Global error-handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

// Start server after everything is set up
app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
});
