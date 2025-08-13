import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { ConnectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js";


dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
const PORT = process.env.PORT || 5000;

ConnectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
