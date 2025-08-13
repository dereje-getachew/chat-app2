import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },

password:{
        type:String,
        required:true,
    },
    profilePicture:{
        type:String,
        default:"https://res.cloudinary.com/dxamis0qy/image/upload/v1709300000/default-profile-picture.png",
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
});

const User = mongoose.model('user', userSchema);
export default User;