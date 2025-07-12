import express from "express";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isAuth } from "../middlewares/isAuthenticated.js";
import { adminRegistration, adminLogin,logout } from "../controllers/admin.js";

const router = express.Router();

router.post("/new",adminRegistration);
router.post("/login",adminLogin);
router.get('/logout',isAuth,isAdmin,logout);

export default router;