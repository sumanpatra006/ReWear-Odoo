import express from "express";
import { isAuth } from "../middlewares/isAuthenticated.js";
import { getNotifications, markAsRead, deleteNotification } from "../controllers/notification.js";

const router = express.Router();

router.get("/", isAuth, getNotifications);
router.put("/:id/read", isAuth, markAsRead);
router.delete("/:id", isAuth, deleteNotification);

export default router;
