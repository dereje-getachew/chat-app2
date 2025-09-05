import React from 'react'
import { useMessageStore } from '../store/useMessageStore'
// import { Sidebar } from 'lucide-react'
import SideBar from '../components/SideBar'
import NoChatContainer from '../components/NoChatContainer'
import ChatContainer from '../components/ChatContainer'

const HomePage = () => {
  const {selectedUser}= useMessageStore()
  return (
    <div className='h-screen bg-base-200'>
      <div className='flex items-center justify-center pt-20 px-4'>
        <div className='bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]'>
          <div className='flex rounded-lg overflow-hidden h-full'>
            <SideBar/>
            {selectedUser?<ChatContainer/>:<NoChatContainer/>}

          </div>

        </div>

      </div>
    </div>
  )
}

export default HomePage