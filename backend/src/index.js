import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { ConnectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes  from  "./routes/message.routes.js"
import cors from "cors";
import {app ,server} from "./lib/socket.js"
import path from "path";

dotenv.config();
app.use(express.json({ limit: "10mb" }));   // allow larger JSON payloads
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // for form data

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
  allowedHeaders: ["Content-Type", "Authorization"], 
}));

app.use(cookieParser());
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
  });
}



server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  ConnectDB();
});




