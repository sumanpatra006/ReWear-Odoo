import { User } from "../models/user.model.js";
import { Item } from "../models/item.model.js";
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

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch basic user info
    const user = await User.findById(userId).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    // Fetch user's uploaded items
    const uploadedItems = await Item.find({ uploadedBy: userId });

    // Fetch user's wishlisted items
    const wishlistedItems = await Item.find({ wishlistedBy: userId });

    // Fetch redeemed items
    const redeemedItems = await Item.find({ redeemedBy: userId });

    // Fetch swapped items
    const swappedItems = await Item.find({
      uploadedBy: userId,
      status: "swapped"
    });

    res.status(200).json({
      profile: {
        name: user.name,
        email: user.email,
        role: user.role,
        points: user.points,
        createdAt: user.createdAt,
      },
      wishlist: wishlistedItems,
      uploadedItems,
      redeemedItems,
      swappedItems,
    });

  } catch (error) {
    console.error("User Profile Error:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};