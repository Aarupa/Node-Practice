import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['Authorization'];
    const token = authHeader && authHeader.replace('Bearer',''); 

    if (!token) return res.status(401).json({ msg: "Access denied. No token provided." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log(decoded);
        next(); 
    } catch (err) {
        res.status(403).json({ msg: "Invalid token." });
    }
};

export default authenticateToken;
