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
      product: [{ type: mongoose.Schema.Types.ObjectId, ref: 'carts', required: true }],
     
     
    },
    {
      timestamps:true
    })



export default mongoose.model('orders',orderSchema)