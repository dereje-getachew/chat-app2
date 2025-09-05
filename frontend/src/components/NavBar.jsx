import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
const NavBar = () => {
  const {logout, authUser}=useAuthStore()
  console.log("authuser in NavBar:", authUser);

  return (
    <header className='bg-base-100 border-b border-base-300 fixed w-full t-0 z-40 backdrop-blur-lg bg-base-100/80'>
      <div className='container mx-auto px-4 h-16'>
        <div className='flex items-center justify-between h-full'>
          <div className='flex items-center gap-8' >
            <Link to={"/"}className='flex items-cneter gap-2.5 hover:opacity-80 transition-all'>
            <div className='size-9 rounded-lg bg-primary/10 felx items-center justify-center'>
            <MessageSquare className="size-5 text-primary"/>
            <h1 className='text-lg font-bold'>chatty</h1>

            </div>
            </Link>

          </div>
          <div className='flex items-center gap-2'>
            <Link to={"/settings"} className={`btn btn-sm gap-2 transition-colors`}>
            <Settings className='h-4 w-4'/>
         <span className="hidden sm:inline">
         Settings
        </span>

            </Link>
{authUser && (
  <>
    <Link to="/profile" className="btn btn-sm gap-2">
      <User className="size-5" />
      <span className="hidden sm:inline">Profile</span>
    </Link>

    <button className="flex items-center gap-2" onClick={logout}>
      <LogOut className="size-5" />
      <span className="hidden sm:inline">Logout</span>
    </button>
  </>

)}


          </div>

        </div>

      </div>
      
    </header>
  )
}

export default NavBar