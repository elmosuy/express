import mongoose, { Schema } from "mongoose";

const profile=new Schema({
    Username:{ type:String , unique:true , index:true },
    Name:String,
    Image:String
})
 
export const Profile= mongoose.model('Profile',profile)