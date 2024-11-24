import Review from '../models/review.model.js';
import Blog from '../models/blog.model.js';

const reviewBlogController = async (req, res) => {
    try {
        const { content, stars } = req.body;
        const userId = req.user._id;
        const blogId = req.query.id;
        console.log('working');

        if (!content || !blogId) {
            return res.status(400).json({ message: 'Content or blogId is missing' });
        }

        const blogExists = await Blog.findById(blogId);
        if (!blogExists) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        const newReview = await Review.create({
            reviewedBy: userId,
            content,
            stars,
        });

        if (!newReview) {
            return res.status(500).json({ message: 'Failed to create review' });
        }

        blogExists.reviews.push(newReview._id);
        await blogExists.save();

        res.status(201).json({ message: 'Review has been created.', newReview });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export default reviewBlogController;