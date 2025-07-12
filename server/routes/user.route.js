import express from "express";
import { register, login , logout} from "../controllers/user.js";
//import { isAuth } from "../middleware/isAuthenticated.js";

const router = express.Router();

//Register and Login
router.post("/new", register);
router.post("/login", login);
router.get("/logout", logout);

export default router;