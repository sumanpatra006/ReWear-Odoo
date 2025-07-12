import mongoose from "mongoose";

const swapSchema = new mongoose.Schema({
  item1: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
  item2: { type: mongoose.Schema.Types.ObjectId, ref: "Item" }, // optional for point-based
  requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  acceptedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["direct", "points"], required: true },
  deliveryMethod: { type: String, enum: ["pickup", "courier", "dropoff"], default: "pickup" },
  status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" },
  messages: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      content: String,
      timestamp: { type: Date, default: Date.now }
    }
  ],
  completedAt: Date
}, { timestamps: true });

export const Swap = mongoose.model("Swap", swapSchema);
