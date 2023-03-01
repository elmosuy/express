import mongoose, { Schema } from "mongoose";

const usernameSchema=new Schema({
    email:{ type:String , unique:true , index:true },
    password:String,
   
})
export const UsernameSchema = mongoose.model('UsernameSchema', usernameSchema);
//    name:String,
//     username:{type:String , unique:true , index:true },