import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  name:{
    type:String,
    require:true,
    trim:true,
  },
  email:{
    type:String,
    require:true,
    
  },
  profile:{
    type:String,
    require:true,
    
  },
  review:{
    type:String,
    require:true,
  },
  rating:{
    type:Number,
    require:true,
  },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
 
 
},
{
  timestamps:true
})



export default mongoose.model('reviews',reviewSchema)