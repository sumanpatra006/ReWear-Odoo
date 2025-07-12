import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String, 
  gender: String, 
  type: String,
  size: String,

  condition: String,             // Manual entry
  aiCondition: String,          // From AI model: Good, Average, Poor

  tags: [String],
  images: [String],             // Cloudinary URLs

  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  // Updated statuses
  status: {
    type: String,
    enum: ["pending", "approved", "swapped", "redeemed", "rejected"],
    default: "pending"
  },

  pointsRequired: {             // For redeeming
    type: Number,
    default: 50
  },

  redeemedBy: {                 // If item is redeemed
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },

  swapCount: {
    type: Number,
    default: 0
  },

  wishlistedBy: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  ]

}, { timestamps: true });

export const Item = mongoose.model("Item", itemSchema);

