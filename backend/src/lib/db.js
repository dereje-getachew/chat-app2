import mongoose from "mongoose"

export const ConnectDB =async()=>{
    try{
        console.log("here is the uri:" + process.env.MONGODB_URI)

        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB successfully");
    }
    catch(error){
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};