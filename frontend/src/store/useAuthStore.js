import { create } from "zustand";
import axios from "axios";
import axiosInstance from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client"; // Add this import
const BaseURL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/api";
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  onlineusers: [],
  isLoading: false,
  isCheckingAuth: true,
  isUpdatingProfile: false,
  socket: null, // Add this to store the socket instance
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket(); // <-- FIXED HERE
    } catch (error) {
      console.error("Error checking auth:", error);
      set({ authUser: null });
      console.error(error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("auth/signup", data);
      set({ authUser: res.data });
      toast.success("account created succefully");
      get().connectSocket(); // <-- FIXED HERE
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("auth/login", data);
      set({ authUser: res.data });
      toast.success("you succefully logged in");
      get().connectSocket(); // <-- FIXED HERE
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    set({ isLoading: true });
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("succeffuly logged out");
      get().disconnectSocket(); // <-- FIXED HERE
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser || socket?.connected) return;

    const userId = authUser._id?.toString(); // Ensure string
    console.log("Connecting socket with userId:", userId);
    const newSocket = io(BaseURL, { query: { userId } });
    set({ socket: newSocket });
    newSocket.connect();
    newSocket.on("getOnlineUsers", (userIds) => {
      set({ onlineusers: userIds.map(id => id.toString()) }); // Ensure all are strings
      console.log("Online users received:", userIds);
    });
  },
  disconnectSocket: () => {
    const { authUser, socket } = get();
    if (get().socket?.connected) get().socket.disconnect();
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/updateprofile", data);
      set({ authUser: res.data });
      toast.success("profile updated succefully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
// export default useAuthStore;
