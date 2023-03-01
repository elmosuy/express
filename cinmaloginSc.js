import mongoose,{Schema} from "mongoose";

const cinmaschema=new Schema({
         bearthday:Number,
         email:{ type:String , unique:true , index:true },
         fullname:String,
         lastname:String,
         password:String,
})

export const CinmasigninSchema=mongoose.model('CinmasigninSchema',cinmaschema)