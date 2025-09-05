import {Server} from "socket.io";
import http from "http";
import express from "express";
const app = express();
const server = http.createServer(app);

const userSocketMap ={};
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Allow all origins for simplicity; adjust as needed for security
       }
});

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}
io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    const userIds = socket.handshake.query.userId;
    console.log("Received userId from client:", userIds); // Debug log
    if(userIds){
        userSocketMap[userIds] = socket.id;
    }
    console.log("Emitting online users:", Object.keys(userSocketMap)); // Debug log
    io.emit("getOnlineUsers", Object.keys(userSocketMap));


    socket.on("disconnect", () => {
        console.log("a user disconnect ",socket.id)
        delete userSocketMap[userIds];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    })
})

export {io ,server,app};