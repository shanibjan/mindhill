import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from 'cors';
import authRoutes from './routes/authRoute.js'
import productRoute from './routes/productRoute.js'
import paymentRoute from './routes/paymentRoute.js'
import path from "path";
import { fileURLToPath } from "url";


dotenv.config();
const app = express()
const corsOptions = {
  origin: 'https://mindhill-8.onrender.com', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow cookies to be sent
  optionsSuccessStatus: 200 // For legacy browsers
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

//database confg
connectDB();




app.use(express.json({ limit: '10mb' })); 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/product',productRoute);
app.use('/api/v1/payment',paymentRoute);
// Serve static files from the public directory (development only)

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});






const PORT = process.env.PORT || 7000;

app.listen(PORT,()=>{
  console.log(`server running successfully on ${PORT}`);
})