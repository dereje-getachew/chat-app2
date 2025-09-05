import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Camera } from 'lucide-react';

const ProfilePage = () => {
 
  const { isUpdatingProfile, authUser ,updateProfile} = useAuthStore();
  const [selectedImg , setSelectedImg] = useState(null)
  const handleImageUpload =(e)=>{
    const file = e.target.files[0];
    if(!file){
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async ()=>{
    const base64Image = reader.result;
    setSelectedImg(base64Image);
    console.log(base64Image)
    await updateProfile({profilePicture:base64Image});
    }

  }

  return (
    <div className="pt-20 min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="bg-base-100 rounded-2xl shadow-xl p-8 w-full max-w-lg">
        {/* Header */}
        <div className="text-center border-b border-base-300 pb-6">
          <h1 className="text-3xl font-bold text-primary">Profile</h1>
          <p className="mt-2 text-base-content/70">Your profile information</p>
        </div>

        {/* Avatar Section */}
        <div className="flex flex-col items-center mt-6">
          <div className="relative">
            <img
              src={authUser?.profilePicture}
              alt="Avatar"
              className="rounded-full object-cover size-32 border-4 border-primary/30 shadow-lg"
            />
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-2 right-2 bg-primary text-primary-content hover:bg-primary/90 p-2 rounded-full cursor-pointer shadow-md transition-all duration-200 ${
                isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
              }`}
            >
              <Camera className="size-5" />
            </label>
            <input
              type="file"
              id="avatar-upload"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUpdatingProfile}
            />
          </div>

          {/* User Info */}
          <h2 className="mt-4 text-xl font-semibold">{authUser?.fullname || "Full Name"}</h2>
          <p className="text-base-content/60">{authUser?.email || "email@example.com"}</p>
        </div>

        {/* Profile Fields */}
        <div className="mt-8 space-y-4">
          <div className="bg-base-300 rounded-lg p-4 shadow-sm">
            <p className="text-xs text-base-content/60">Username</p>
            <p className="font-medium">{authUser?.username || "username"}</p>
          </div>

          <div className="bg-base-300 rounded-lg p-4 shadow-sm">
            <p className="text-xs text-base-content/60">Email</p>
            <p className="font-medium">{authUser?.email || "email@example.com"}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3">
          <button className="btn btn-primary flex-1">Edit Profile</button>
          <button className="btn btn-outline flex-1">Change Password</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
