import express from "express";
import productModel from "../models/productModel.js";
import reviewModel from "../models/reviewModel.js";
import userModel from "../models/userModel.js";
import { MongoUnexpectedServerResponseError } from "mongodb";
import cartModel from "../models/cartModel.js";
import orderModel from "../models/orderModel.js";
import orderedUserModel from "../models/orderedUserModel.js";
import mongoose from "mongoose";
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

    // Validate that the userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Find the user by the valid userId
    const user = await userModel.findById(userId);

    // If no user is found, return an error response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If the user exists, return the user's product list
    res.status(200).json(user.product);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/favorite/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await userModel.findById(userId).populate("product");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
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

    res.json({
      success: true,
      message: "Already in cart,quantity Updated",
      item,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete-cart/:id", async (req, res) => {
  try {
    await cartModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Cart deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/create-order", async (req, res) => {
  try {
    const { userId, cartId, address, bill } = req.body;

    if (!address) {
      return res.status(400).send({ message: "Fill Address" });
    }
    console.log(cartId);
    
    const order = await new orderModel({
      user: userId,
      product: cartId,
      address,
      bill,
    }).save();
    res.status(201).send({
      success: true,
      message: "order Added successfully",
      order: order,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-order/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const populatedOrders = await orderModel.find({ user: userId });

res.status(200).json(populatedOrders);

  } catch (error) {
    console.log(error);
  }
});


router.post("/create-ordered-users", async (req, res) => {
  try {
    const { userId } = req.body;

    let orderedUser = await orderedUserModel.findOne();

    if (!orderedUser) {
      orderedUser = new orderedUserModel({ users: userId });
    }

    if (!orderedUser.users.includes(userId)) {
      orderedUser.users.push(userId);
      res.json({ message: "user added" });
    }

    await orderedUser.save();

    res.status(200).json(orderedUser);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
});


router.get("/get-ordered-users", async (req, res) => {
  try {
    const orderedUsers = await orderedUserModel.find().populate("users");
    res.status(200).json(orderedUsers);
  } catch (error) {}
});

router.put('/update-orders/:id',async(req,res)=>{
  try {
    const{status}=req.body
    const orders=await orderModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    console.log(req.body);
    
    if(status===""){
      return res.status(400).send({ message: "Set status" });
    }
    res.json({
      success: true,
      message: "order status Updated",
      orders,
    });

  } catch (error) {
    
  }
})

router.get('/search',async(req,res)=>{
  try {
    const searchQuery=req.query.q || '';

    const searchedProducts=await productModel.find({
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },         // Search by name
        { category: { $regex: searchQuery, $options: 'i' } },  // Search by description
      ],
    })
    res.status(200).json(searchedProducts);
  } catch (error) {
    console.log(error);
    
  }
})

const getProductOverview = async(req, res) => {
  try {
    const productId = req.params.productId;
  // Logic to fetch product details from database using the productId
  // Assuming you've fetched the product data:
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }
  const productData = await productModel.find({ _id:productId });

  if(!productData){
    return res.status(400).send({ message: "invalid productId" });
  }
  
  
  res.json(productData);
  } catch (error) {
    console.log(error);
    
  }
  
};

router.get('/overview/:productId',getProductOverview)




export default router;
