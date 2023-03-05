import express from 'express';
import bodyParser from 'body-parser';
import  userRouter  from './src/router/user.js';
const port = 4000
import mongoose from 'mongoose';
import nodemailer from 'nodemailer'
const app=express()
import cors from 'cors'

import HTML_TEMPLATE from './src/router/mail.js';
app.use(cors())
const parser=bodyParser.json()
app.use(parser);
app.use(userRouter)





const email=()=>{
// create reusable transporter object using the default SMTP transport
 const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "ahmdhmd018@gmail.com",
    pass: "fpsuwgqxefdexhnh",
  
  },
});
const message = "Hi Iam ayman Elmosuy Iam frontend devloper and backend devloper can speak english and arabic "
const options = {
    from: "ahmdhmd018@gmail.com", // sender address
    to: "ahmdhmd018@gmail.com", // receiver email
    subject: "Cinama in React Components", // Subject line
    text: message,
    html:HTML_TEMPLATE(message)
}

  
  transporter.sendMail(options,(err)=>{
    if(err){
        console.log("it has error",err);
    }else{
        console.log("email has send")
    }
  })
  




// const typeDefs = graphql 
 
//   type Book {
//     title: String
//     author: String
//   }

  
//   type Query {
//     books: [Book]
//   }
// ;


}
email()



// app.use('/graphql',graphqlHTTP({
//     schema: schema,
//     rootValue: root,
//     graphiql: true,
//   }));
app.use(bodyParser.urlencoded({ extended: true }));


async function main() {
    await mongoose.connect("mongodb+srv://elmosuy:1234@cluster0.iyuxxpr.mongodb.net/?retryWrites=true&w=majority")
}
//conect to mongo db elmosuy  mongodb+srv://elmosuy:1234@cluster0.iyuxxpr.mongodb.net/?retryWrites=true&w=majority
main().then(()=>{ 
    
    console.log('conected db')
    app.listen(port)
})


   


  




