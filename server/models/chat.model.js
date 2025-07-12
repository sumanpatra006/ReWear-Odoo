import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  swapId: { type: mongoose.Schema.Types.ObjectId, ref: "Swap" },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: String,
  sentAt: { type: Date, default: Date.now }
});

export const Message = mongoose.model("Message", messageSchema);
