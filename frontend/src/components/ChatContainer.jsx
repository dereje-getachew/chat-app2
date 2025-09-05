import React, { use, useRef, useEffect } from 'react'
import { useMessageStore } from '../store/useMessageStore';
import { Loader } from 'lucide-react';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import  MessageSkeleton  from './skeletons/MessageSkeleton';
import { useAuthStore } from '../store/useAuthStore';

const ChatContainer = () => {
  const { messages,getMessage,isMessageLoading,selectedUser,subscribeMessages,unSubscribeMessages } = useMessageStore();
  const {authUser}= useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(()=>{
    if(selectedUser){
      getMessage(selectedUser._id);
      subscribeMessages();
      return ()=>{
        unSubscribeMessages();
      }
    }
  },[getMessage,selectedUser , subscribeMessages, unSubscribeMessages])

  useEffect(() => {
    if(messageEndRef.current){
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if(isMessageLoading)
    {
    return (
    <div className='flex-1 flex flex-col overflow-auto'>
     <ChatHeader/>
     <MessageSkeleton/>
     <MessageInput/>
    </div>
    )
  }
  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader/>
   <div className='flex-1 overflow-y-auto p-4 space-y-4'>
    {messages.map((message)=>(
      <div key={message._id} className={`chat ${message.senderId===authUser._id?'chat-end':'chat-start'}`}>
        <div className='chat-image avatar'> 
          <div className='size-10 rounded-full border'>
            <img src={message.senderId===authUser._id?authUser.profilepic:selectedUser.profilepic||"avatar.png"} alt={message.senderId}/>
             </div>

        </div>
        <div className='chat-header mb-1'>
        <time  className='text-xs opacity-50'>{new Date(message.createdAt).toLocaleString()}</time>
          </div>
      <div className='chat-bubble flex flex-col'>
        {message.image &&(
          <img src={message.image} alt={"frontend/public/avatar.png"} className='max-w-xs rounded-lg'/>
        )}
        {message.text && <p>{message.text}</p>}
        </div>

         </div>
    ))}
        <div ref={messageEndRef} /> {/* Dummy div for scroll */}
   </div>
      <MessageInput/>

    </div>
  )
}

export default ChatContainer