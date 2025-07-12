import express from "express";
import { uploadItem,getAllItems ,getItemById,toggleWishlist ,requestSwap,redeemItem} from "../controllers/item.js";
import { isAuth } from "../middlewares/isAuthenticated.js";
import { upload} from "../middlewares/multer.js";

const router = express.Router();

router.post("/upload", isAuth, upload.single("image"), uploadItem);
router.get("/all", getAllItems);
router.get("/:id", getItemById);
router.post("/:id/wishlist", isAuth, toggleWishlist);
router.post("/:id/swap", isAuth, requestSwap);
router.post("/:id/redeem", isAuth, redeemItem);

export default router;