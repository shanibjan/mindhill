import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from 'cors';
import authRoutes from './routes/authRoute.js'
import productRoute from './routes/productRoute.js'
import paymentRoute from './routes/paymentRoute.js'


dotenv.config();

//database confg
connectDB();

const app = express()
app.use(cors());
app.use(express.json({ limit: '10mb' })); 


app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/product',productRoute);
app.use('/api/v1/payment',paymentRoute);



const PORT = process.env.PORT || 7000;

app.listen(PORT,()=>{
  console.log(`server running successfully on ${PORT}`);
})