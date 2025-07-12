import express from "express";
import { uploadItem } from "../controllers/item.js";
import { isAuth } from "../middlewares/isAuthenticated.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/upload", isAuth, upload.single("image"), uploadItem);

export default router;