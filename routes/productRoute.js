import express from 'express'
import productModel from '../models/productModel.js';
import reviewModel from '../models/reviewModel.js';
const router = express.Router()

router.post('/add-product',async(req,res)=>{
    try {
        const{img1,img2,img3,img4,name,price,offerPrice,rating,category}=req.body
        if(!img1||!img2||!img3||!img4||!name||!price||!offerPrice||!rating||!category){
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



router.post('/add-review',async(req,res)=>{
    try {
        const{name,email,review,rating,productId}=req.body
        if(!name||!email){
            return res.status(400).send({ error: 'Please Login' });
            
            
        }
        if(!review||!rating){
            return res.status(400).send({ error: 'Please fill your review' });
        }

        const reviews=new reviewModel({name,email,review,rating,product:productId})
        const item = await reviews.save();
        res.status(201).send({
            success: true,
            message: 'Review Added successfully',
            reviews:item,
          });
    } catch (error) {
        console.log(error);
        
        res.status(500).send({
            success: false,
            message: "Error in Add Review",
            error,
          });
    }
})


router.get('/get-review/:id',async(req,res)=>{
    try {
        const productId=req.params.id
        const review=await reviewModel.find({product:productId})
        res.status(200).json(review);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
})
export default router;