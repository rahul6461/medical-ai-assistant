import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import reportRoutes from './routes/reportRoutes.js';

dotenv.config();

// Connect DB
connectDB();

const app=express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/reports', reportRoutes);

// Serve static uploads folder (if needed to display uploaded images on frontend)
app.use('/uploads',express.static('uploads'));

//Base Route
app.get("/",(req,res)=>{
    res.json({ message: "Medical AI Assistant API is running smoothly."});
});

// Global Error Handler
app.use((err,req,res,next)=>{
    const statusCode=res.statusCode===200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null:err.stack,
    }); 
});
//Use env port
const PORT= process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`Server blazing on port ${PORT} in ${process.env.NODE_ENV} mode `);
});
