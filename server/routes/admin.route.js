import express from "express";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isAuth } from "../middlewares/isAuthenticated.js";
import { adminRegistration, adminLogin,logout ,getAllItemsForModeration,approveItem,rejectItem,deleteItem} from "../controllers/admin.js";

const router = express.Router();

router.post("/new",adminRegistration);
router.post("/login",adminLogin);
router.get('/logout',isAuth,isAdmin,logout);

router.get("/items", isAdmin, getAllItemsForModeration);
router.patch("/items/:id/approve", isAdmin, approveItem);
router.patch("/items/:id/reject", isAdmin, rejectItem);
router.delete("/items/:id", isAdmin, deleteItem);

export default router;