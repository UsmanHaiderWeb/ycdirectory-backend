import jsonwebtoken from 'jsonwebtoken';

const verifyToken = (token) => {
    try {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        console.error("Token verification failed:", error.message);
        return null;
    }
};

export default verifyToken;