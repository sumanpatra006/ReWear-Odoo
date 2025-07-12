import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String, 
  gender: String, 
  type: String,
  size: String,
  condition: String,
  aiCondition: String, // from AI model: Good, Average, Poor
  tags: [String],
  images: [String], // cloudinary URLs
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["pending", "approved", "swapped", "rejected"], default: "pending" },
  swapCount: { type: Number, default: 0 },
  wishlistedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });

export const Item = mongoose.model("Item", itemSchema);
