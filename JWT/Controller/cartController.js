import Carts from "../Schema/cartSchemas.js";
import jwt from 'jsonwebtoken';

const getCart = async (req, res) => {
    const cartItems = await Carts.find();
    res.status(200).json(cartItems);
};

const createCart = async (req, res) => {
    const { name, quantity, price } = req.body;
    const authHeader = req.get('Authorization');
    const token = authHeader.replace('Bearer ', '');

    if (!token) return res.status(401).json({ msg: "No token provided" });

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({ msg: "Invalid token" });
    }

    if (!name || quantity === undefined || price === undefined) {
        return res.status(400).json({ msg: "Invalid data" });
    }

    const newCart = new Carts({ name, quantity, price, username:decoded.username });
    await newCart.save();
    res.status(201).json({ msg: "Cart item created", newCart });
};

const updateCart = async (req, res) => {
    const { name, quantity, price } = req.body;
    const authHeader = req.get('Authorization');
    const token = authHeader.replace('Bearer ', '');

    if (!token) return res.status(401).json({ msg: "No token provided" });

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({ msg: "Invalid token" });
    }

    if (!name || quantity === undefined || price === undefined) {
        return res.status(400).json({ msg: "Invalid data" });
    }

    const cartItem = await Carts.findOne({ name, username:decoded.username });
    
    if (!cartItem) {
        return res.status(404).json({ msg: `Cart item not found for user ${decoded.username}` });
    }

    cartItem.quantity = quantity;
    cartItem.price = price;
    await cartItem.save();

    res.status(200).json({ msg: "Cart item updated", cartItem });
};

const deleteCart = async (req, res) => {
    const { _id } = req.body;
    const authHeader = req.get('Authorization');
    const token = authHeader.replace('Bearer ', '');

    if (!token) return res.status(401).json({ msg: "No token provided" });

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({ msg: "Invalid token" });
    }

    if (!_id) {
        return res.status(400).json({ msg: "Invalid data" });
    }

    const cartItem = await Carts.findOneAndDelete({ _id, username:decoded.username });
    
    if (!cartItem) {
        return res.status(404).json({ msg: `Cart item not found for user ${decoded.username}` });
    }

    res.status(200).json({ msg: "Cart item deleted", cartItem });
};

export { getCart, createCart, updateCart, deleteCart };
