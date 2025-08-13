// test-mongo.js
import mongoose from "mongoose";

const uri = "mongodb+srv://getachewdereje128:myoc7mCcQM696PTt@cluster0.vb8xyxh.mongodb.net/chat_app?retryWrites=true&w=majority&appName=Cluster0";

(async () => {
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connection successful!");
    process.exit(0);
  } catch (err) {
    console.error("❌ MongoDB connection failed:");
    console.error(err);
    process.exit(1);
  }
})();
