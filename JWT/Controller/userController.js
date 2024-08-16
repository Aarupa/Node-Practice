import jwt from 'jsonwebtoken';
import { hashPassword, comparePassword } from "../utils/passwordHashing.js";
import User from "../Schema/userschema.js";

const getUser = async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
};


const getRegister = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(401).json({ msg: "Invalid user" });

    const presentUser = await User.findOne({ username });
    if (presentUser)
        return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await hashPassword(password);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(200).json({ msg: "Registration successful" });
};

const getLogin = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
        return res.status(401).json({ msg: "Invalid username or password" });

    const matchPassword = await comparePassword(password, user.password);
    if (!matchPassword)
        return res.status(401).json({ msg: "Invalid username or password" });

    const tokenData = { username };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET);
    res.status(200).json({ msg: "Login successful", token });
};

const updateUser = async (req, res) => {
    const { username, newPassword } = req.body;
    const autoHeader = req.get('Authorization');
    
    if (!autoHeader) return res.status(401).json({ msg: "No token provided" });
    
    const token = autoHeader.replace('Bearer ', '');
    let decoded;
    
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({ msg: "Invalid token" });
    }
    
    if (!username || !newPassword) {
        return res.status(400).json({ msg: "Invalid data" });
    }

    const user = await User.findOne({ username: decoded.username });
    if (!user) {
        return res.status(404).json({ msg: "User not found" });
    }

    user.password = await hashPassword(newPassword);
    await user.save();
    res.status(200).json({ msg: "User updated successfully" });
};

const deleteUser = async (req, res) => {
    const { username } = req.body;
    const autoHeader = req.get('Authorization');
    
    if (!autoHeader) return res.status(401).json({ msg: "No token provided" });
    
    const token = autoHeader.replace('Bearer ', '');
    let decoded;
    
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({ msg: "Invalid token" });
    }
    
    if (!username) {
        return res.status(400).json({ msg: "Invalid data" });
    }

    const user = await User.findOne({ username: decoded.username });
    if (!user) {
        return res.status(404).json({ msg: "User not found" });
    }

    await User.deleteOne({ username: decoded.username });
    res.status(200).json({ msg: "User deleted successfully" });
};

export { getUser, getRegister, getLogin, updateUser, deleteUser };
