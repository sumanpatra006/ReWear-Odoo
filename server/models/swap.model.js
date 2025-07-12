import mongoose from "mongoose";

const swapSchema = new mongoose.Schema({
  itemRequested: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },  // the item user wants
  itemOffered: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },    // the item user offers

  requester: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "cancelled"],
    default: "pending"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Swap = mongoose.model("Swap", swapSchema);

