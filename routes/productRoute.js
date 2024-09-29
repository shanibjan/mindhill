import express from "express";
import productModel from "../models/productModel.js";
import reviewModel from "../models/reviewModel.js";
import userModel from "../models/userModel.js";
import { MongoUnexpectedServerResponseError } from "mongodb";
import cartModel from "../models/cartModel.js";
import orderModel from "../models/orderModel.js";
const router = express.Router();

router.post("/add-product", async (req, res) => {
  try {
    const {
      img1,
      img2,
      img3,
      img4,
      name,
      price,
      offerPrice,
      rating,
      category,
    } = req.body;
    if (
      !img1 ||
      !img2 ||
      !img3 ||
      !img4 ||
      !name ||
      !price ||
      !offerPrice ||
      !rating ||
      !category
    ) {
      return res.status(400).send({ error: "All fields are required" });
    }
    const existingProduct = await productModel.findOne({
      img1,
      img2,
      img3,
      img4,
    });
    if (existingProduct) {
      return res.status(400).json({ message: "Product images already added" });
    }
    const products = await new productModel({
      img1,
      img2,
      img3,
      img4,
      name,
      price,
      offerPrice,
      rating,
      category,
    }).save();
    res.status(201).send({
      success: true,
      message: "Product Added successfully",
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
});

router.get("/get-product", async (req, res) => {
  const product = await productModel.find();
  res.json(product);
});

router.post("/add-review", async (req, res) => {
  try {
    const { name, email, review, rating, productId, profile } = req.body;
    if (!name || !email) {
      return res.status(400).send({ message: "Please Login" });
    }
    if (!review || !rating) {
      return res.status(400).send({ message: "Please fill your review" });
    }

    const reviews = new reviewModel({
      name,
      email,
      review,
      rating,
      product: productId,
      profile,
    });
    const item = await reviews.save();
    res.status(201).send({
      success: true,
      message: "Review Added successfully",
      reviews: item,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error in Add Review",
      error,
    });
  }
});

router.get("/get-review/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const review = await reviewModel.find({ product: productId });
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/add-fav", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(400).send({ message: "Please Login" });
    }
    if (!user.product.includes(productId)) {
      user.product.push(productId);
      await user.save();
    }
    res.status(201).send({
      success: true,
      message: " Added to wishlist",
      favorites: user.product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Failed to add to favorites" });
  }
});

router.post("/remove-fav", async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const user = await userModel.findById(userId);
    user.product = user.product.filter((id) => id.toString() !== productId);
    await user.save();
    res.status(201).send({
      success: true,
      message: " Removed from wishlist",
      favorites: user.product,
    });
  } catch (error) {}
});

router.get("/favoritelist/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await userModel.findById(userId);
    res.status(200).json(user.product);
  } catch (error) {
    console.log(error);
  }
});
router.get("/favorite/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await userModel.findById(userId).populate("product");
    res.status(200).json(user.product);
  } catch (error) {
    console.log(error);
  }
});

router.post("/add-cart", async (req, res) => {
  try {
    const { name, img1, userId, offerPrice, quantity, productId } = req.body;
    if (!name || !userId) {
      return res.status(400).send({ message: "Please Login" });
    }

    const cart = new cartModel({
      name,
      img1,
      user: userId,
      offerPrice,
      quantity,
      product: productId,
    });

    const item = await cart.save();
    res.status(201).send({
      success: true,
      message: " Added to cart",
      cart: item,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error in Add Review",
      error,
    });
  }
});

router.get("/get-cart/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const cart = await cartModel.find({ user: userId });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/update-cart/:id", async (req, res) => {
  try {
    const item = await cartModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json({ success: true, message: "Already in cart,quantity Updated", item });
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: err.message });
  }
});

router.delete('/delete-cart/:id', async (req, res) => {
  try {
    
    
    await cartModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Cart deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.post('/create-order',async(req,res)=>{
  try {
    const {userId,cartId,address,bill}=req.body
    console.log(address);
    
    if(!address){
      return res.status(400).send({ message: "Fill Address" });
    }
    const order=await new orderModel({user:userId,product:cartId,address,bill}).save()
    res.status(201).send({
      success: true,
      message: "order Added successfully",
      order: order,
    });
  } catch (error) {
    console.log(error);
    
  }
})

router.get("/get-order/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await orderModel.find({user:userId}).populate('product')
    console.log(user);
    
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});
export default router;
