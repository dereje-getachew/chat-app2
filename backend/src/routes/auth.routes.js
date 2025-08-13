import express from "express";

const router=express.Router();
import { signup, login, logout, updateProfile , checkAuth} from "../controllers/auth.controllers.js";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { get } from "mongoose";

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.post("/updateprofile",protectedRoute, updateProfile);
router.get("/check",protectedRoute,checkAuth);




export default router;