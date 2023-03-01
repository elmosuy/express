import mongoose, { Schema } from "mongoose";

const userSchema=new Schema({
    bearthday:Number,
    email:{ type:String , unique:true , index:true },
    username:{ type:String , unique:true , index:true },
    name:String,
    password:String,
})
export const Instagram = mongoose.model('Instagram', userSchema);
