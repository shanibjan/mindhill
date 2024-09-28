import express from "express";
import Razorpay from "razorpay";

const router = express.Router();

const razorpay = new Razorpay({
    key_id: 'rzp_test_VYT3qiUFj68Unw',
    key_secret: 'UUu8gOXV8YOdqIS2gYtQCTOv',
  });

  router.post('/create-order', async (req, res) => {
    const options = {
      amount: req.body.amount, // amount in smallest currency unit
      currency: 'INR',
      receipt: 'receipt#1',
    };
  
    try {
      const order = await razorpay.orders.create(options);
      res.json(order);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  });






export default router;