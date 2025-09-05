import { Image, Send, X } from "lucide-react";
import React, { use } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useMessageStore } from "../store/useMessageStore";
import toast from "react-hot-toast";
// import { set } from "mongoose";
const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const {sendMessage}= useMessageStore();
  const fileInputRef = useRef(null);
// ...existing code...
const handleImageChange = (e) => {
  const file = e.target.files[0]; // <-- FIXED HERE
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    toast.error("Please select an image file");
    return;
  }
  const reader = new FileReader();
  reader.onloadend = () => {
    setImagePreview(reader.result);
  };
  reader.readAsDataURL(file);
};

const handleSendMessage = async (e) => {
  e.preventDefault(); // <-- PREVENT FORM RELOAD
  if (!text.trim() && !imagePreview) return;

  try {
    await sendMessage({
      text: text.trim(),
      image: imagePreview,
    });
    setText("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setImagePreview(null);
  } catch (error) {
    toast.error("Failed to send message");
  }
};
  const removeImage = () => {
    setImagePreview(null);
    if(fileInputRef.current){
      fileInputRef.current.value="";
    }
  };
  return (
    <div className="p-4 w-full">
      {imagePreview && (
      <div className="mb-3 flex items-center gap-2">
          <div className="relative">
          <img
            src={imagePreview}
            alt="Preview"
            className="size-20 rounded-lg w-full border border-zinc-700 object-cover"
          />

          <button
            onClick={removeImage}
            className="absolute -top-1.5 -right-1.5 size-5 rounded-full flex items-center justify-center bg-base-300"
            type="button"
          >
            <X className="size-3" />
          </button>
        </div>
        </div>
      )}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1  flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="type message..."
            className="w-full input input-bordered input-sm bg-base-300 border-zinc-700 
  focus:border-primary focus:ring-0 focus:outline-none"
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
            accept="image/*"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className={`hidden sm:flex btn btn-circle ${
              imagePreview ? "text-emerald-500" : "text-zinc-400 "
            }`}
          >
            <Image size={20}   />
          </button>
        </div>
        <button className="btn btn-sm btn-circle" type="submit"
          disabled={!text.trim() && !imagePreview}>
            <Send size={22} />

        </button>
      </form>
    </div>
  );
};

export default MessageInput;
