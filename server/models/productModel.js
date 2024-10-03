import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name:{
    type:String,
    require:true,
    trim:true,
  },
  category:{
    type:String,
    require:true,
    trim:true,
  },
  img1:{
    type:String,
    require:true,
    unique:true,
  },
  img2:{
    type:String,
    require:true,
    unique:true,
  },
  img3:{
    type:String,
    require:true,
    unique:true,
  },
  img4:{
    type:String,
    require:true,
    unique:true,
  },
  price:{
    type:Number,
    require:true,
  },
  offerPrice:{
    type:Number,
    require:true,
  },
  rating:{
    type:Number,
    require:true,
  },
 
 
},
{
  timestamps:true
})



export default mongoose.model('products',productSchema)