import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import cloudinary from "../lib/cloudinary.js"; 
//Sign up Controller
export const signUp = async(req, res) => {
    const { email, fullName, password, bio } = req.body;
    try {
        if (!email || !fullName || !password || !bio) {
            return res.json({success: false, message: 'All are required' });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.json({success: false, message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            email,
            fullName,
            password: hashedPassword,
            bio,
        });
        const token = generateToken(newUser._id);
        res.json({
            success: true,
            userData: newUser,
            token,
            message: 'Account created successfully',
        });
    } catch (error) {
        console.error(error);
     res.json({
            success: false,
            message: 'Error creating account: ' + error.message,
        });
    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({ email });
        const isPasswordValid = await bcrypt.compare(password, userData.password);

        if (!isPasswordValid) {
            return res.json({ success: false, message: 'Invalid email or password' });
        }
        const token = generateToken(userData._id);
        res.json({
            success: true,
            userData,
            token,
            message: 'Login successful',
        });
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: 'Error logging in: ' + error.message,
        });
    }
}
export const checkAuth = (req, res) => {
    res.json({
        success: true,
        user: req.user,
    });
}
// Update user profile
export const updateProfile = async (req, res) => {
    try {
        const { profilePic, bio, fullName } = req.body;
        const userId = req.user._id;
        let updatedUser;
        if(!profilePic){
            updatedUser = await User.findByIdAndUpdate(userId, { bio, fullName },{ new: true });
        }
        else {
            const upload = await cloudinary.uploader.upload(profilePic);
            updatedUser = await User.findByIdAndUpdate(userId, { profilePic: upload.secure_url, bio, fullName }, { new: true });
        }
        res.json({
            success: true,
            userData: updatedUser,
            message: 'Profile updated successfully',
        });
    } catch (error) {
        console.error(error.message);
        res.json({
            success: false,
            message: 'Error updating profile: ' + error.message,
        });
    }
}