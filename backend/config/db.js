import mongoose from "mongoose";

export  const connectDB = async() =>{
    await mongoose.connect('mongo db location').then(()=>console.log("DB Connected"));
}