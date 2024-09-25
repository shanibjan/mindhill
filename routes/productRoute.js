import express from 'express'
import productModel from '../models/productModel.js';
const router = express.Router()

router.post('/add-product',async(req,res)=>{
    try {
        const{img1,img2,img3,img4,name,price,offerPrice,rating,category}=req.body
        if(!img1,!img2,!img3,!img4,!name,!price,!offerPrice,!rating,!category){
            return res.status(400).send({ error: 'All fields are required' });
        }
        const products =await new productModel({img1,img2,img3,img4,name,price,offerPrice,rating,category}).save()
        res.status(201).send({
            success: true,
            message: 'Product Added successfully',
            products,
          });
    } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error in Add product",
          error,
        });
    }
})

router.get('/get-product',async(req,res)=>{
    const product=await productModel.find()
    res.json(product)
})
export default router;