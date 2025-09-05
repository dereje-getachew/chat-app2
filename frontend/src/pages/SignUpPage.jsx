import { Mail, Lock, MessageSquare ,User, Eye ,EyeOff,Link } from 'lucide-react';

import React from 'react'
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';
import { AuthImagePattern } from '../components/AuthImagePattern.jsx';
import toast from 'react-hot-toast';
const SignUpPage = () => {
  const {signUp, isSigningup } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const validateForm = () => {
    if(!formData.username.trim() ) return toast.error("full name is reqiured");
    if(!formData.email.trim()) return toast.error("email is required");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!emailRegex.test(formData.email.trim())) {
    return toast.error("Please enter a valid email address");
    }
    if(!formData.password.trim()) return toast.error("password is required");
    if(formData.password.length<6) return toast.error("password should be above 6 character");
   return true;

  }
  const handleSubmite = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if(success===true){
      signUp(formData);
    }

  };

  return (
  <div className="min-h-screen grid lg:grid-cols-2">



  {/* Right side - Form */}
  <div className="flex items-center justify-center p-6 sm:p-12">
    <div className="w-full max-w-md space-y-8">
      {/* Logo / Title */}
      <div className="text-center mb-8">
        <div className="flex flex-col items-center gap-2 group">
          <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <MessageSquare className="size-6 text-primary group-hover:text-primary/80 transition-colors" />
          </div>
          <h1 className="text-2xl font-semibold text-primary">Create Account</h1>
          <p className="text-sm text-muted-foreground">Get started with your account</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmite} className="space-y-6">
        {/* Full Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Full Name</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="size-5 text-base-content/40" />
            </div>
            <input
              type="text"
              className="input input-bordered w-full pl-10"
              placeholder="Full name"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>
        </div>
                {/* Email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">email</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="size-5 text-base-content/40" />
            </div>
            <input
              type="text"
              className="input input-bordered w-full pl-10"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>
            

        {/* Password */}
             <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">password</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="size-5 text-base-content/40" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              className="input input-bordered w-full pl-10"
              placeholder="....."
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button type='button'
          className='absolute inset-y-0 right-0 pr-3 flex items-center'
            onClick={()=>setShowPassword(!showPassword)}>
           {showPassword?(<EyeOff className='size-5 text-base-content/40'/>):(<Eye className='size-5 text-base-content/40'/>)}
            </button>
          </div>
        </div>
        <button type='submit' className='btn btn-primary w-full' disabled={isSigningup}>
          {isSigningup?( <Loader className='size-5 animate-spin'/>):("create account")}
        </button>
      </form>
     <div class="mt-4 text-center">
  <p class="text-sm text-gray-600">
    Already have an account? 
    <a href="/login" class="text-blue-500 hover:underline">
      Log in
    </a>
  </p>
</div>

    </div>
  </div>

<AuthImagePattern title={"Join us today"} subtitle={"Create an account to get started"}/>
  
</div>

 
  )
}

export default SignUpPage;