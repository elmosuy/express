import express from "express"
import { jwt } from "jsonwebtoken";
import  {Instagram}  from "../../userSc.js";
import  { body,validationResult } from 'express-validator';
const userRouter= express.Router();
import bcrypt from 'bcrypt';
import { UsernameSchema } from "../../usernameSc.js";
import { CinmasigninSchema } from "../../cinmaloginSc.js";
import { Profile } from "../../profileSc.js";
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
//userRouter.get('/p/:id',(req,res) => {
//          const id =  req.params.id
       
//          console.log("id : ", req.params['38']);
    
//          res.send("is id person"+Instagram.findById({_id:id}))
//         // console.log(id)

//     })
 userRouter.post('/insta' , async(req,res)=>{
    try{
         const {email,username,name,bearthday,password} = req.body; 
         const hash=await bcrypt.hash(password,saltRounds)
    
         const insta=new Instagram({
             bearthday,
             email,
             username,
             name, 
             password:hash,       
         })
         await insta.save()
         res.send('add user')
         
     }catch(error){
        if(error.code===11000) {return res.status(400).send({massage:"You Regstion Ready"})}
     }
        
     })
    userRouter.get("/insta", async (req,res)=>{
         const loginR=await Instagram.find({})
        res.send(loginR)
      
    })




 

userRouter.get('/',async(req,res)=>{
   try{
    const {email,password} = req.query;
    const newUsers=new UserSchema({
        email,
        password,       
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
userRouter.post("/user" ,async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
  return  res.send("is Not Email");}


    try{



        
    const {email, password } = req.body;

    const hash=await bcrypt.hash(password,saltRounds)
    const newUser=new UsernameSchema({
        email,
        password:hash,
    })

    
    await newUser.save()
}catch(error){
   if(error.code===11000) {return res.status(400).send({massage:"You Regstion Ready"})}
}
    res.send("hello world")
})

userRouter.post("/login" , async(req,res)=>{
    const {email,password}=req.body;
    const loginR=await CinmasigninSchema.findOne({email:email,password:password})
    if(loginR){
        res.send({sucess:true})
    }else{
        
        res.send({sucess:false})
    }
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
const JSON_SECRET="ayman123";
userRouter.get("/home/user",(req,res)=>{
    const token=jwt.sign({
        email:"ayman@gmail.com",
        username:"elmosuy"
    },JSON_SECRET,{expiresIn:"1h"} )

    res.json({
        token:token
    })
   
})


export default userRouter;