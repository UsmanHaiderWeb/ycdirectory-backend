import Review from '../models/review.model.js';

const reviewAppController = async (req, res) => {
    try {
        const { content, stars } = req.body;
        const userId = req.user._id;
        console.log('working');

        if (!content || !stars) {
            return res.status(400).json({ message: 'Content is missing' });
        }

        const newReview = await Review.create({
            reviewedBy: userId,
            content,
            stars,
            isRelatedToApp: true,
        });
        if (!newReview) {
            return res.status(500).json({ message: 'Failed to create review' });
        }
        res.status(201).json({ message: 'Review has been created.', newReview });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export default reviewAppController;