import Creator from '../models/creator.model.js'
import verifyToken from '../helpers/verifyToken.js'
import { clerkClient } from '@clerk/express'

const authenticate = async (req, res, next) => {
    try {
        const { clerkId, token } = req.query;
        if (!clerkId) {
            return res.status(400).json({ message: 'No clerkId provided' });
        }
        try {
            let UserDataFromClerk = await clerkClient.users.getUser(clerkId);
            if(!UserDataFromClerk){
                return res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            return res.status(404).json({ message: 'User not found' });
        }
        let user = undefined;
        try {
            let {_id, email} = verifyToken(token); 
            if(_id && email){
                user = await Creator.findOne({_id, email, clerkData: clerkId});
            }
        } catch (error) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export default authenticate;