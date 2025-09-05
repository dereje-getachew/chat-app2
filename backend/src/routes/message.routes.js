import express from "express";
const router = express.Router();
import { protectedRoute } from "../middleware/auth.middleware.js";

import { getUserSidebar, getmessages ,sendMessage} from "../controllers/message.controllers.js";
router.get("/user",protectedRoute, getUserSidebar);
router.get("/:id",protectedRoute, getmessages);
router.post("/send/:id",protectedRoute, sendMessage);


export default router;
