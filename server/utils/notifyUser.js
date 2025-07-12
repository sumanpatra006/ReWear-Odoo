import { Notification } from "../models/notification.model.js";

export const notifyUser = async (userId, message) => {
  try {
    await Notification.create({ user: userId, message });
  } catch (err) {
    console.error("Notification Error:", err.message);
  }
};
