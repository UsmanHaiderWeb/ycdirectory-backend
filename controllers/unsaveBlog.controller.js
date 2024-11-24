import Blog from '../models/blog.model.js';

const unsaveBlogController = async (req, res) => {
    try {
        const userId = req.user._id.toString();
        const blogId = req.body.blogID;
        console.log('working');

        if (!blogId) {
            return res.status(400).json({ message: 'BlogId is missing' });
        }

        const blogExists = await Blog.findById(blogId).populate('createdBy');
        if (!blogExists) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        req.user.savedBlogs = req.user.savedBlogs.filter(id => id.toString() !== blogId);
        await req.user.save();

        res.status(201).json({ message: 'This blog has been unliked by you.', unSavedBlogId: blogId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export default unsaveBlogController;