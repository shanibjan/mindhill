import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  name:{
    type:String,
    require:true,
    trim:true,
  },
  img1:{
    type:String,
    require:true,
   
  },
  offerPrice:{
    type:Number,
    require:true,
  },
  quantity:{
    type:Number,
    require:true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
 
 
},
{
  timestamps:true
})



export default mongoose.model('carts',cartSchema)