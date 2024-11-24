import Creator from '../models/creator.model.js';

const unlikeCreatorController = async (req, res) => {
    try {
        const userId = req.user._id.toString();
        const creatorId = req.body.creatorID;

        if (!creatorId) {
            return res.status(400).json({ message: 'CreatorId is missing' });
        }
        
        if (userId === creatorId) {
            return res.status(400).json({ message: 'You cannot unlike yourself.' });
        }
        
        const creatorExists = await Creator.findById(creatorId);
        if (!creatorExists) {
            return res.status(404).json({ message: 'Creator not found' });
        }
        if(!req.user.likedCreators.includes(creatorId) && !creatorExists.recommendedBy.includes(userId)){
            return res.status(400).json({ message: 'Creator is already unliked by you.' });
        }
        console.log('working');

        creatorExists.recommendedBy = creatorExists.recommendedBy.filter(id => id.toString() !== userId);
        await creatorExists.save();

        req.user.likedCreators = req.user.likedCreators.filter(id => id.toString() !== creatorId);
        await req.user.save();

        res.status(201).json({ message: 'This creator has been unliked by you.', unlikedCreatorId: creatorId });
    } catch (error) {
        console.log("NLIKE CREATOR CONTROLLER ERROR: ", error.message);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export default unlikeCreatorController;