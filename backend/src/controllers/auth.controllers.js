import { generateToken } from '../lib/utils.lib.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import cloudinary from '../lib/cloudinary.js';
export const signup = async (req, res) => {
    const {username,email,password} = req.body;
    try {
       if (!password || password.length < 6) {
  return res.status(400).json({
    message: "Password must be at least 6 characters long.",
  });
}

        const user = await User.findOne({ email});
        if(user){
            return res.status(400).json({message:"User with this email already exists."});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

  if(newUser){
    console.log("New user created:", newUser);
    generateToken(newUser._id, res); // Make sure this signs { id: newUser._id }
    await newUser.save();
    res.status(200).json({
        _id: newUser._id,
        username:newUser.username,
        email:newUser.email
    });
    
  }
  else{
        res.status(400).json({message: "invalid user data"})
    }
    } catch (error) {
        console.log("error in signup controller",error.message)
        res.status(500).json({message: "internal server error"});
        
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "invalid credential" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "invalid credential" });
        }

        generateToken(user._id, res); // Make sure this signs { id: user._id }

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email
        });
    } catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
};


export const logout =(req,res)=>{
    res.clearCookie("jwt");
    res.status(200).json({ message: "User logged out successfully" });  
}


export const updateProfile = async (req, res) => {
   try {
    const{profilepic}= req.body;
    const userid = req.user._id;
    if(!profilepic){
        return res.status(400).json({ message: "Profile picture is required" });
    }
    const uploadResponse = await cloudinary.uploader.upload(profilepic);
    const updatedUser = await User.findByIdAndUpdate(
        userid,
        { profilepic: uploadResponse.secure_url },
        { new: true }
    );
    

   } catch (error) {
        console.log("error in updateProfile controller", error.message);
        res.status(500).json({ message: "internal server error" });
    
   }
}

export const checkAuth = (req, res) => {
   try {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized access" });
    }
    res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        profilepic: user.profilepic // Use the correct property name
    });
   } catch (error) {
        console.log("error in checkAuth controller", error.message);
        res.status(500).json({ message: "internal server errors" });
    
   }
}