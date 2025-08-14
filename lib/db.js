import mongoose from "mongoose";

// Connect to MongoDB
export const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    });
    await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`);
    console.log('MongoDB connected successfully');

  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }
};