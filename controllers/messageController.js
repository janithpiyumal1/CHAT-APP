import { trusted } from "mongoose";
import Message from "../models/Message.js";
import cloudinary from "../lib/cloudinary.js";
import {io, userSocketMap} from "../server.js";
import User from "../models/User.js";

//Get all users except the logged-in user
export const getUsersForSidebar = async (req, res) => {
    try {
        const userID = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: userID } }).select('-password');
        //count the number of messages not seen
        const unSeenMessages = {};
        const promises = filteredUsers.map(async (user) => {
            const messages = await Message.find({
                senderId: user._id,
                receiverId: userID,
                seen: false,
            })
            if (messages.length > 0) {
                unSeenMessages[user._id] = messages.length;
            
            }
        })
        await Promise.all(promises);
        res.json({
            success: true,
            users: filteredUsers,
            unSeenMessages,
        });
    } catch (error) {
        console.error(error.message);
        res.json({
            success: false,
            message: 'Error fetching users: ' + error.message,
        });
    }
}
// Get all messages for selected user
export const getMessages = async (req, res) => {
    try {
        const { id: selectedUserID } = req.params;
        const myID = req.user._id;

        // Fetch messages between the logged-in user and the selected user
        const messages = await Message.find({
            $or: [
                { senderId: myID, receiverId: selectedUserID },
                { senderId: selectedUserID, receiverId: myID }
            ]
        });

        // Mark messages as seen if they are from the selected user
        await Message.updateMany(
            { senderId: selectedUserID, receiverId: myID},
            { seen: true }
        );

        res.json({
            success: true,
            messages,
        });
    } catch (error) {
        console.error(error.message);
        res.json({
            success: false,
            message: 'Error fetching messages: ' + error.message,
        });
    }
}
// api to mark messages as seen
export const markMessagesAsSeen = async (req, res) => {
    try {
        const { id} = req.params;
        await Message.findByIdAndUpdate(id, { seen: true });
        res.json({
            success: true
        });
    } catch (error) {
        console.error(error.message);
        res.json({
            success: false,
            message: 'Error marking messages as seen: ' + error.message,
        });
    }
}
//send message to selected user
export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const receiverId = req.params.id;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        // Create a new message 
        const newMessage = await Message.create({
            senderId,
            receiverId,
            text,
            image: imageUrl ,
        });

        // Emit the message to the receiver's socket
        const receiverSocketId = userSocketMap[receiverId];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMessage);
        }

        res.json({
            success: true,
            data: newMessage,
        });
    } catch (error) {
        console.error(error.message);
        res.json({
            success: false,
            message: 'Error sending message: ' + error.message,
        });
        
    }
}