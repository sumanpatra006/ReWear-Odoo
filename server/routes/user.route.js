import express from "express";
import { register, login , logout,getUserProfile} from "../controllers/user.js";
import { isAuth } from "../middlewares/isAuthenticated.js";

const router = express.Router();

//Register and Login
router.post("/new", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/profile",isAuth, getUserProfile);

export default router;