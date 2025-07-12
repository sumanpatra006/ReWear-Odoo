import {User} from "../models/user.model.js";
import { Item } from "../models/item.model.js";
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

// controllers/adminController.js



export const getAllItemsForModeration = async (req, res) => {
  try {
    const { status, category, gender, type } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (gender) filter.gender = gender;
    if (type) filter.type = type;

    const items = await Item.find(filter).populate("uploadedBy", "name email");

    res.status(200).json({
      message: "Items fetched for moderation",
      items
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//Approving items
export const approveItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.status = "approved";
    await item.save();

    // TODO: send notification (optional)
    res.status(200).json({ message: "Item approved", item });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//Rejecting items
export const rejectItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.status = "rejected";
    await item.save();

    // TODO: send notification (optional)
    res.status(200).json({ message: "Item rejected", item });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//Delete inappropriate items
export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    res.status(200).json({ message: "Item deleted by admin" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


