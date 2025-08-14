import express from 'express';
import "dotenv/config";
import cors from 'cors';
import http from 'http';
import { connect } from 'mongoose';
import { connectDB } from './lib/db.js';
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import { Server } from 'socket.io';
 
// Create an Express application and HTTP server
const app = express();
const server = http.createServer(app);

// Set up Socket.IO
export const io = new Server(server, {
  cors: {origin: '*'}
});

//Store online users
export const userSocketMap = {};//{userId: socketId}
// Handle Socket.IO connections
io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId;
  console.log(`User connected: ${userId}`);
  if (userId) {
    userSocketMap[userId] = socket.id;
  }
  //Emit online users to all connected clients
  io.emit('getOnlineUsers', Object.keys(userSocketMap));
  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('User disconnected');
    delete userSocketMap[userId];
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});

// Middleware 
app.use(express.json({limit: '4mb'}));
app.use(cors());

// Import routes
app.use('/api/status', (req, res) => res.send('Server is live'));
app.use('/api/auth', userRouter);
app.use('/api/messages', messageRouter);


// Import and connect to the database
await connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});