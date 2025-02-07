import express from 'express';
import mongoose from 'mongoose';
import process from 'process';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';


dotenv.config();
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

connectDB();
const app  = express();
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);   
});


app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

// path to middleware
app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const  message = err.statusCode || 'Internal Server Error';
    res.status(statusCode).send({
        success:false,
        statusCode,
        message,
        
        
    });
});
