import mongoose from "mongoose";

const orderedUserSchema = new mongoose.Schema({
   
      users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }],
     
     
    },
    {
      timestamps:true
    })



export default mongoose.model('orderedusers',orderedUserSchema)