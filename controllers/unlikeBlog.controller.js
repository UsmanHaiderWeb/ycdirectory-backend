import Blog from '../models/blog.model.js';

const unlikeBlogController = async (req, res) => {
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

        if(!req.user.likedBlogs.includes(blogId) || !blogExists.likedBy.includes(userId)){
            return res.status(400).json({ message: 'Blog is already unliked by you.' });
        }

        blogExists.likedBy = blogExists.likedBy.filter(id => id.toString() !== userId);
        await blogExists.save();

        req.user.likedBlogs = req.user.likedBlogs.filter(id => id.toString() !== blogId);
        await req.user.save();

        res.status(201).json({ message: 'This blog has been unliked by you.', unlikedBlogId: blogExists._id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export default unlikeBlogController;