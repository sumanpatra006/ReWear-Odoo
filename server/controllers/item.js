import { Item } from "../models/item.model.js";
import { Swap } from "../models/swap.model.js";
import { User } from "../models/user.model.js";
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





export const getAllItems = async (req, res) => {
  try {
    // Extract query params
    const {
      page = 1,
      limit = 10,
      search = "",
      category,
      gender,
      type,
      size,
      status,
      aiCondition,
      sort = "newest"
    } = req.query;

    // Construct MongoDB query object
    const query = {};

    if (category) query.category = category;
    if (gender) query.gender = gender;
    if (type) query.type = type;
    if (size) query.size = size;
    if (aiCondition) query.aiCondition = aiCondition;

    // Status filter (optional default to "approved")
    if (status) query.status = status;
    else query.status = "approved"; // default for public routes

    // Search by title or tags
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } }
      ];
    }

    // Sorting logic
    let sortOption = { createdAt: -1 }; // default = newest first
    if (sort === "mostSwapped") sortOption = { swapCount: -1 };
    else if (sort === "trending") sortOption = { swapCount: -1, createdAt: -1 };

    // Pagination logic
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch items
    const items = await Item.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Item.countDocuments(query);

    res.status(200).json({
      items,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
    });

  } catch (error) {
    console.error("GetAllItems Error:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const getItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findById(id).populate({
      path: "uploadedBy",
      select: "name email role"
    });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ item });
  } catch (error) {
    console.error("GetItemById Error:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const toggleWishlist = async (req, res) => {
  try {
    const itemId = req.params.id;
    const userId = req.user._id;

    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    const alreadyWishlisted = item.wishlistedBy.includes(userId);

    if (alreadyWishlisted) {
      item.wishlistedBy.pull(userId);
      await item.save();
      return res.status(200).json({ message: "Item removed from wishlist" });
    } else {
      item.wishlistedBy.push(userId);
      await item.save();
      return res.status(200).json({ message: "Item added to wishlist" });
    }
  } catch (error) {
    console.error("Wishlist Toggle Error:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const requestSwap = async (req, res) => {
  try {
    const itemRequestedId = req.params.id;
    const { offeredItemId } = req.body;
    const userId = req.user._id;

    // Check if both items exist
    const itemRequested = await Item.findById(itemRequestedId);
    const itemOffered = await Item.findById(offeredItemId);

    if (!itemRequested || !itemOffered) {
      return res.status(404).json({ message: "One or both items not found" });
    }

    // Prevent self-swap
    if (itemRequested.uploadedBy.toString() === userId.toString()) {
      return res.status(400).json({ message: "You cannot request swap on your own item" });
    }

    // Create new swap request
    const newSwap = await Swap.create({
      itemRequested: itemRequestedId,
      itemOffered: offeredItemId,
      requester: userId,
    });

    res.status(201).json({
      message: "Swap request sent successfully",
      swap: newSwap
    });

  } catch (error) {
    console.error("Swap Request Error:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const redeemItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const userId = req.user._id;

    const item = await Item.findById(itemId);
    const user = await User.findById(userId);

    if (!item) return res.status(404).json({ message: "Item not found" });
    if (item.status !== "pending")
      return res.status(400).json({ message: "Item is not available for redeem" });

    const cost = item.pointsRequired || 50;

    if (user.points < cost) {
      return res.status(400).json({ message: "Insufficient points to redeem this item" });
    }

    // Deduct points
    user.points -= cost;
    await user.save();

    // Update item status
    item.status = "redeemed";
    item.redeemedBy = userId;
    await item.save();

    res.status(200).json({
      message: "Item redeemed successfully",
      pointsLeft: user.points,
      itemId: item._id
    });

  } catch (error) {
    console.error("Redeem Error:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
