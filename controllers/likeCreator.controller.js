import Creator from '../models/creator.model.js';

const likeCreatorController = async (req, res) => {
    try {
        const userId = req.user._id.toString();
        const creatorId = req.body.creatorID;
        
        if (!creatorId) {
            return res.status(400).json({ message: 'CreatorId is missing' });
        }
        
        if (userId === creatorId) {
            return res.status(400).json({ message: 'You cannot like yourself.' });
        }
        console.log('working');
        
        const creatorExists = await Creator.findById(creatorId);
        if (!creatorExists) {
            return res.status(404).json({ message: 'Creator not found' });
        }
        if(req.user.likedCreators.includes(creatorId) || creatorExists.recommendedBy.includes(userId)){
            return res.status(400).json({ message: 'Creator is already liked by you.' });
        }

        creatorExists.recommendedBy.push(userId);
        await creatorExists.save();
        req.user.likedCreators.unshift(creatorExists._id);
        await req.user.save();

        res.status(201).json({ message: 'This creator has been liked by you.', likedCreator: creatorExists });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export default likeCreatorController;