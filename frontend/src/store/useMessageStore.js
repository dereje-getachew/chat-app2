import {create} from "zustand";
import axiosInstance from '../lib/axios.js';
import toast from 'react-hot-toast';
import { use } from "react";
import { useAuthStore } from "./useAuthStore.js";
// import { send } from "vite";
export const useMessageStore = create((set,get)=>(
    {
messages:[],
users:[],
isUserLoading:false,
isMessageLoading:false,
selectedUser:null,

getUsers : async () => {
    set({isUserLoading:true});
    try {
    const res =  await axiosInstance.get("/message/user");
    set({users:res.data});

    } catch (error) {
        toast.error(error.response.data.message);
    }

    finally {
        set({isUserLoading:false});
    }

},

getMessage : async(userId)=>{
    set({isMessageLoading:true}); // fix: should be true when loading starts
    try {
        const res =await axiosInstance.get(`/message/${userId}`);
        set({messages:res.data})
    } catch (error) {
        toast.error(error.response.data.message);
    }
    finally{
        set({isMessageLoading:false});
    }
},

sendMessage: async(messageData)=>{
    const {selectedUser, messages} = get();
    if (!selectedUser || !selectedUser._id) {
        toast.error("No user selected to send message.");
        return;
    }
    try {
        const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
        set({messages: [...messages, res.data]});
    } catch (error) {
        toast.error(error.response.data.message);
    }
},
subscribeMessages: () =>{
    const {selectedUser}= get();
    if(!selectedUser) return;
    const socket = useAuthStore.getState().socket;
    socket?.on("newMessage", (newMessage) => {
        
        if (newMessage.senderId === selectedUser._id || newMessage.receiverId === selectedUser._id) {
            const { messages } = get();
            set({ messages: [...messages, newMessage] });
        }
    });
},
unSubscribeMessages: () =>{
    const socket = useAuthStore.getState().socket;
    socket?.off("newMessage");
},

setSelectedUser:(selectedUser)=>{
    set({selectedUser})
}
    }


))