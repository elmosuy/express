import mongoose, { Schema } from "mongoose";

const adminScemaA=new Schema({
    device:Object,
    device2:Object,  
   
})
export const AdminB = mongoose.model('AdminB', adminScemaA);
   