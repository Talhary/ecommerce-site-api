import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'your_jwt_secret';

 const generateToken = (data) => {
    return jwt.sign({ 
        displayName:data.displayName,
        email:data.email,
        picture:data.picture,
        lang:data.language,
        id:data.id
        
     }, secret, { expiresIn: '1h' });
};

 const verifyToken = (token) => {
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        return null;
    }
};
export {verifyToken,generateToken}