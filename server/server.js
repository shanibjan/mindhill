import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";
import productRoute from "./routes/productRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const corsOptions = {
  origin: true, // Your frontend URL
  
};
app.use(cors(corsOptions));


//database confg
connectDB();

app.use(express.json({ limit: "10mb" }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/payment", paymentRoute);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`server running successfully on ${PORT}`);
});
