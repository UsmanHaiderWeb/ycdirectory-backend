import Blog from '../models/blog.model.js'
import uploadImageToCloudinary from '../helpers/cloudinary.helper.js'

const createBlogController = async (req, res) => {
    try {
        const { title, description, categories, tags } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: 'Some required fields are missing' });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No image provided' });
        }
        const cloudinaryResponse = await uploadImageToCloudinary(req.file.buffer);
        if (!cloudinaryResponse || !cloudinaryResponse?.secure_url) {
            return res.status(500).json({ message: 'Failed to upload image to cloudinary' });
        }

        const newBlog = await Blog.create({
            title,
            description,
            categories,
            tags,
            image: cloudinaryResponse?.secure_url,
            createdBy: req.user._id
        });

        if (!newBlog) {
            return res.status(500).json({ message: 'Failed to create blog' });
        }
        req.user.blogs.unshift(newBlog._id);
        await req.user();
        res.status(201).json({message: 'Blog has been created.', newBlog});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export default createBlogController;