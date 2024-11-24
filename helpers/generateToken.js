import jwt from 'jsonwebtoken';

const generateToken = (email, _id) => {
    const token = jwt.sign({ email, _id }, process.env.JWT_SECRET);
    return token;
};


export default generateToken;