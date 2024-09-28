import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    require:true,
    trim:true,
  },
  email:{
    type:String,
    require:true,
    unique:true,
  },
  password:{
    type:String,
    require:true,
  },
  phone:{
    type:String,
    require:true,
    unique:true,
  },
  profile:{
    type:String,
    require:true,
  },
  product: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true }],
 
},
{
  timestamps:true
})



export default mongoose.model('users',userSchema)