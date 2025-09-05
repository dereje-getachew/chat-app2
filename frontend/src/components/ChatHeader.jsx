import React from 'react'
import { useMessageStore } from '../store/useMessageStore'; 
import { useAuthStore } from '../store/useAuthStore';
import { X } from 'lucide-react';

const ChatHeader = () => {
    const { selectedUser ,setSelectedUser} = useMessageStore();
    const {onlineusers}= useAuthStore();
return (
  <div className="p-2.5 border-b border-base-300">
    <div className="flex items-center justify-between">
      {/* Left: Avatar + User Info */}
      <div className="flex items-center gap-3">
        <div className="avatar">
          <div className="size-10 rounded-full relative">
            <img
              src={selectedUser.profilepic || "avatar.png"}
              alt={selectedUser?.name}
              className="object-cover w-full h-full rounded-full"
            />
          </div>
        </div>

        <div>
          <h2 className="font-medium text-lg">{selectedUser?.username}</h2>
          <div className="text-sm text-zinc-400">
            {onlineusers.includes(selectedUser?._id) ? "Online" : "Offline"}
          </div>
        </div>
      </div>

      {/* Right: Close button */}
      <button
        onClick={() => setSelectedUser(null)}
        className="p-2 rounded-full hover:bg-base-200"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  </div>
);

}

export default ChatHeader