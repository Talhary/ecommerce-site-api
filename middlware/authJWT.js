import { verifyToken } from '../utils/jwt.js';
import User from '../models/user.js'
 const isAuthenticated =async (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];
 
    if (!token) {
        return res.status(401).json({ msg: 'Unauthorized: No token provided' });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
        return res.status(401).json({ msg: 'Unauthorized: Invalid token' });
    }

    req.user =decoded
    next();
};
export {isAuthenticated}