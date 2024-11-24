import {v2 as cloudinary} from 'cloudinary';
import streamifier from 'streamifier'

const uploadImageToCloudinary = async (buffer) => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUDNAME,
            api_key: process.env.CLOUDINARY_APIKEY,
            api_secret: process.env.CLOUDINARY_SECRET,
        });
        
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream((err, result) => {
                if(err) {
                    return reject(err);
                } else {
                    resolve(result);
                }
            })
            streamifier.createReadStream(buffer).pipe(uploadStream);
        })
    } catch (error) {
        console.error("UPLOAD ON CLOUDINARY: ", error.message);
        return false;
    }
};

export default uploadImageToCloudinary;