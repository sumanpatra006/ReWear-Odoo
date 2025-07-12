import {User} from "../models/user.model.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";

export const adminRegistration=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const user=await User.findOne({email});
        if(user){
            return res.status(404).json({
                success:false,
                message:"Admin Already Exists"
            })
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=await User.create({
            name,
            email,
            password:hashedPassword,
            role:"admin" //implicit role
        })
        sendCookie(newUser,res,"Registered Successfully",201);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

export const adminLogin=async(req,res)=>{
    try {
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
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

export const logout=(req,res)=>{
    res.status(200).cookie("token","",{expires:new Date(Date.now())}).json({
        success:true,
        message:"Logout Successfully"
    })
}