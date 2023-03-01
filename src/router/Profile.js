// import express from "express"
// import { Profile } from "../../profileSc";




// const ProfileRouter=express.Router()

// ProfileRouter.post("/Profile", async(req,res)=>{
//     try{
//     const {Username,Name,Image}=req.body;
//     const profileSc=new Profile({
//         Username,
//         Name,
//         Image,
//     })
//     await profileSc.save()
//     res.send('add user')
// }catch(error){
// if(error.code===1100){
//     return res.status(400).send({massage:"You Requir"})
// }
// }

// })

// export default ProfileRouter