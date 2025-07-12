import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/features.js";

export const register=async (req,res)=>{
  const {name,email,password,role}=req.body;

  const user=await User.findOne({email});
  if(user){
    return res.status(404).json({
      success:false,
      message:"User Already Exists"
    })
  }
 
  const hashedPassword=await bcrypt.hash(password,10);

  const newUser=await User.create({
    name,
    email,
    password:hashedPassword,
    role
  })

  sendCookie(newUser,res,"Registered Successfully",201);
  
};

export const login=async (req,res,next)=>{
   const {email,password}=req.body;
   const user=await User.findOne({email}).select("+password");

   if(!user){
    return res.status(404).json({
      success:false,
      message:"User Not Found"
    })
   };
   //password checking
   const isMatch=await bcrypt.compare(password,user.password);

   if(!isMatch){
    res.status(404).json({
      success:false,
      message:"Incorrect Password"
    })
   };

   if(isMatch){
    sendCookie(user,res,`Login Successfully,Welcome back ${user.name}`,200);
   }


}

export const logout=(req,res)=>{
  res.status(200).cookie("token","",{expires:new Date(Date.now())}).json({
    success:true,
    message:"Logout Successfully"
  })
}