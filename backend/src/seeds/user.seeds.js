import {config} from 'dotenv';
import User from '../models/User.js';
import { ConnectDB } from '../lib/db.js';
config();


// seedUsers.js
const users = Array.from({ length: 50 }, (_, i) => {
  const num = i + 1;
  return {
    username: `user${num}`,
    email: `user${num}@example.com`,
    password: `password${num}`, // In real apps, hash with bcrypt before saving
    profilePicture: `https://randomuser.me/api/portraits/lego/${num % 10}.jpg`,
    createdAt: new Date()

  };
});

const seedUsers = async () =>{
    try {
        await ConnectDB()
        await User.insertMany(users);
        console.log("Users seeded successfully");
    } catch (error) {
        console.error("Error seeding users:", error);
    }
}
seedUsers();