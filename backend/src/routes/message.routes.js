import express from "express";
const router = express.Router();
import { getUserSidebar, getmessages } from "../controllers/message.controllers.js";
router.get("/user",protectedRoute, getUserSidebar);
router.get("/:id",protectedRoute, getmessages);
router.post("/send/:id",protectedRoute, sendmessage);


export default router;
