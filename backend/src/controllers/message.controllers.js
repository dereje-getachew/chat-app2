import express from "express";import { get } from "mongoose";
import User from "../models/User.js";
import message from "../models/message.models.js";
import cloudinary from "../lib/cloudinary.js";
import { io, getReceiverSocketId } from "../lib/socket.js";


export const getUserSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id; // Assuming req.user is set by the protectedRoute middleware
        const filteredUser = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUser);
    } catch (error) {
        console.error("Error fetching user sidebar:", error.message);
        res.status(500).json({ message: "Internal server error" });
        
    }
}

export const getmessages = async (req, res) => {
    try {
        const { id: userId } = req.params;
        const loggedInUserId = req.user._id; // Assuming req.user is set by the protectedRoute middleware

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const messages = await message.find({
            $or: [
                { senderId: loggedInUserId, receiverId: userId },
                { senderId: userId, receiverId: loggedInUserId }
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error.message);
        res.status(500).json({ message: "Internal server error" });
    } 
}

export const sendMessage = async (req, res) => {
    try {
        const {text, image} = req.body;
        const senderId = req.user._id;
        const receiverId = req.params.id;

        if (!receiverId || receiverId === "undefined") {
            return res.status(400).json({ message: "Receiver ID is required and must be valid" });
        }

        if (!text && !image) {
            return res.status(400).json({ message: "Message text or image is required" });
        }
        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        await newMessage.save();
        const recieverSocketId = getReceiverSocketId(receiverId);
        if (recieverSocketId) {
            io.to(recieverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error sending message:", error.message);
        res.status(500).json({ message: "Internal server error" });
        
    }
}