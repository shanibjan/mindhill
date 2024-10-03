import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    address:{
        type:String,
        require:true,
        
      },
      status:{
        type:String,
        default: 'order placed',
        require:true,
        
      },
      bill:{
        type:Number,
        require:true,
      },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
     
      product: [
        {
          _id: {  type: String, required: true   },
          name: { type: String, required: true },
          img1: { type: String, required: true },
          offerPrice:{type: Number, required: true },
          quantity:{type: Number, required: true }
        }
      ]
     
     
    },
    {
      timestamps:true
    })



export default mongoose.model('orders',orderSchema)