import Blog from '../models/blog.model.js';

const saveBlogController = async (req, res) => {
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

        req.user.savedBlogs.unshift(blogExists._id);
        await req.user.save();

        res.status(201).json({ message: 'This blog has been liked by you.', savedBlog: blogExists });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export default saveBlogController;