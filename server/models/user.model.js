import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: true,
    minlength: 6
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },

  points: {
    type: Number,
    default: 0
  },

  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item"
  }],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const User = mongoose.model("User", userSchema);
