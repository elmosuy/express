import mongoose,{Schema} from "mongoose";

const doctors= new Schema({
         index:Number,
         name:String,
         header:String,
         ul:String
})

export const Data=mongoose.model('Data',doctors)