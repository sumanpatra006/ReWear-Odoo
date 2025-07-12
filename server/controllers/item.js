import { Item } from "../models/item.model.js";
import { uploadImage } from "../utils/cloudinary.js";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";

export const uploadItem = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      gender,
      type,
      size,
      tags
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Upload image to Cloudinary
    const cloudinaryRes = await uploadImage(req.file.path);
    const imageUrl = cloudinaryRes.secure_url;

    // Prepare FormData for Flask API
    const formData = new FormData();

    // Using same file for both user_image and warehouse_image
    const stream = fs.createReadStream(req.file.path);
    formData.append("user_image", stream);
    formData.append("warehouse_image", fs.createReadStream(req.file.path)); // Temporary same image
    formData.append(
      "json",
      JSON.stringify({
        number_of_deliveries: 1,
        return_delay_days: 5
      })
    );

    // Send request to Flask
    const flaskRes = await axios.post(
      "https://flask-return-api.onrender.com/return",
      formData,
      {
        headers: formData.getHeaders()
      }
    );

    const flaskData = flaskRes.data;
    const aiCondition = flaskData.risk_level || "Unknown";

    // Save to MongoDB
    const newItem = await Item.create({
      title,
      description,
      category,
      gender,
      type,
      size,
      tags: tags?.split(",").map(tag => tag.trim()) || [],
      image: imageUrl,
      aiCondition,
      uploadedBy: req.user._id,
      status: "pending"
    });

    // Delete temp file
    fs.unlinkSync(req.file.path);

    res.status(201).json({
      message: "Item uploaded successfully",
      flaskInsight: flaskData,
      item: newItem
    });

  } catch (error) {
    console.error("UploadItem Error:", error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};


