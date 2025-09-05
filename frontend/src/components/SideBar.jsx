import React, { use, useEffect } from "react";
import { useMessageStore } from "../store/useMessageStore";
import { useAuthStore } from "../store/useAuthStore";
import SideBarSkeleton from "./skeletons/SideBarSkeleton";
import { Users } from "lucide-react";
import { useState } from "react";
const SideBar = () => {
  const { selectedUser, users, getUsers, isUserLoading, setSelectedUser } =
    useMessageStore();
  const { onlineusers } = useAuthStore();
  const [onlyOnlineUsers, setOnlyOnlineUsers] = useState(false);
  const filteredOnlineUsers = onlyOnlineUsers
    ? users.filter((user) => onlineusers.includes(user._id?.toString()))
    : users;

  useEffect(() => {
    getUsers();
  }, [getUsers]);
  if (isUserLoading) {
    return <SideBarSkeleton />;
  }
  return (
    <aside className="h-full w-20 border-r flex flex-col lg:w-72 border-base-300 transition-all duration-200">
      <div className="w-full border-b border-base-300 p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
              <input
            type="checkbox"
            checked={onlyOnlineUsers}
            onChange={(e) => setOnlyOnlineUsers(e.target.checked)}
            className="checkbox checkbox-sm"
          />
          <span className="text-sm">Online Only</span>
          </label>
          <span className="text-xs text-zinc-500">{onlineusers.length-1} online</span>
        </div>
      </div>
      <div className="overflow-y-auto w-full py-3">
        {filteredOnlineUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center gap-3 transition-colors hover:bg-base-200 
        ${
          selectedUser?._id === user._id
            ? "bg-base-300 ring-1 ring-base-300"
            : ""
        }`}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={user.profilePic || `/avatar.png`}
                alt={user.username}
              />
              {onlineusers.includes(user._id?.toString()) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              )}
            </div>

            {/* user info only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium text-sm truncate">
                {user.username}
              </div>
              <div className="text-sm text-zinc-400">
                {onlineusers.includes(user._id?.toString())
                  ? "Online"
                  : "Offline"}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default SideBar;
