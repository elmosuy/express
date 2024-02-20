import express from "express"
import  {Instagram}  from "../../userSc.js";
import  { body,validationResult } from 'express-validator';
const userRouter= express.Router();
import bcrypt from 'bcrypt';
import { Admin } from "../../adminSc.js";
import { AdminB } from "../../cinmaloginSc.js";
import { Profile } from "../../profileSc.js";
const SECEUR_JWT="12334"
import jwt from 'jsonwebtoken';
import { Data } from "../../doctorSc.js";






    const saltRounds = 4;
userRouter.post('/signin' , async(req,res)=>{
try{
     const {email,fullname,lastname,bearthday,password} = req.body; 
     const hash=await bcrypt.hash(password,saltRounds)

     const cinma=new CinmasigninSchema({
         bearthday,
         email,
         fullname,
         lastname,   
         password:hash,       
     })
     await cinma.save()
     res.send('add user')
     
 }catch(error){
    if(error.code===11000) {return res.status(400).send({massage:"You Regstion Ready"})}
 }
    
 })

 userRouter.post('/home' , async(req,res)=>{
    try{
         const {email,username,name,bearthday,password} = req.body; 
         const hash=await bcrypt.hash(password,saltRounds)
    
         const insta=new AdminScema({
             bearthday,
             email,
             username,
             name, 
             password:hash,    
         })

         await insta.save()
         res.send('add user')
         var token = jwt.sign({email}, SECEUR_JWT);
         res.send(token)
         
         
     }catch(error){
        if(error.code===11000) {return res.status(400).send({massage:"You Regstion Ready"})}
     }
        
     })
    userRouter.get("/doctor", async (req,res)=>{
        try{
         const loginR= await Data.find({index:"1"})
        res.send(loginR)
        }
        catch(error){
            console.log(error); 
        }
    }) 




 

userRouter.get('/admin',async(req,res)=>{
   try{
    const {email,password} = req.query;
    const newUsers=new Admin({
        Town:Number,
        floors:Object,       
    })
    await newUsers.save()
    
}catch(error){
 if(error.code===11000) {return res.status(400).send({massage:"dont found"})}
 }
    // const em=await UserSchema.findOne({name})
    // res.send(em)
   
    
    })
//     console.log(userRouter.length)
// ,body('email').isEmail().withMessage("this is not email")
userRouter.post("/admin" ,async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
  return  res.send("is Not Email");}


    try{



        
    const {email, password } = req.body;

    const hash=await bcrypt.hash(password,saltRounds)
    const newUser=new Admin({
        Town:1,
        floors:{"ayman":"askja"}, 
    })

    
    await newUser.save()
}catch(error){
   if(error.code===11000) {return res.status(400).send({massage:"You Regstion Ready"})}
}
    res.send("hello world")
})

userRouter.get("/admina" , async(req,res)=>{
    const loginR=await Admin.find()
    res.send(loginR)

     
})



userRouter.post("/Profile", async(req,res)=>{
    try{
    const {Username,Name,Image}=req.body;
    const profileSc=new Profile({
        Username,
        Name,
        Image,
    })
    await profileSc.save()
    res.send('add user')
}catch(error){
if(error.code===1100){
    return res.status(400).send({massage:"You Requir"})
}
}

})

userRouter.get("/homeApp", async(req,res)=>{
const resing=await Profile.find({})
res.send(resing)
})
userRouter.get("/homeApp/profile", async(req,res)=>{
    try{
    const {_id}=req.query;
    const resing=await Profile.findOne({_id:_id})
    res.send(resing)
    console.log(resing)}catch(err){
        if(err.code===1100){
            return res.status(400).send({massage:"You Requir"})
        }
    }

    })
    
userRouter.delete("/homeApp/profile",(req,res)=>{
    const {_id}=req.query;
    Profile.findByIdAndDelete(({_id:_id}),(err,docs)=>{
        res.send(docs)
    })

})


export default userRouter;
