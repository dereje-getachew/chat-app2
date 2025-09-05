import React from 'react'
import {Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import SettingsPage from './pages/SettingsPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import { useAuthStore } from './store/useAuthStore.js';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import axiosInstance from './lib/axios.js';
import {Toaster} from "react-hot-toast"
import { useThemeStore } from './store/useThemeStore.js';
const App = () => {
  const  {theme}= useThemeStore()
  const { authUser, checkAuth, isCheckingAuth, onlineusers } = useAuthStore();
  console.log("Online Users:", onlineusers); // Debugging line to check online users
  useEffect (()=>{
    checkAuth()},
  [checkAuth]);

 if(isCheckingAuth && !authUser){
  return (    
   <div className="flex items-center justify-center h-screen">
 <Loader className="size-10 animate-spin"/>
  </div>
 )
}

  return (
    <div data-theme={theme}>
      <NavBar />
      <Routes>
        <Route path="/" element={authUser?<HomePage/>:<Navigate to="/login" /> } />
        <Route path="/login" element={!authUser?<LoginPage />:<Navigate to="/" />} />
        <Route path="/signup" element={!authUser?<SignUpPage />:<Navigate to="/" />} />
        <Route path="/profile" element={authUser?<ProfilePage />:<Navigate to="/login" />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
