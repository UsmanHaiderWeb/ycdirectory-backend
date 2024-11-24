import { clerkClient } from "@clerk/express";
import Creator from '../models/creator.model.js'
import generateToken from "../helpers/generateToken.js";

const registerController = async (req, res) => {
    try {
        const { clerkID } = req.body;
        if (!clerkID) {
            return res.status(400).json({ message: 'No clerkID provided' });
        }
        let userData = await clerkClient.users.getUser(clerkID);
        if (!userData) {
            return res.status(404).json({ message: 'User not found on clerk' });
        }

        const existingUser = await Creator.findOne({ clerkData: clerkID });
        if (existingUser) {
            if((existingUser.email !== userData.emailAddresses[0].emailAddress) ||
                (existingUser.username !== userData.username) ||
                existingUser.image !== (userData.imageUrl || '')) {
                existingUser.email = userData.emailAddresses[0].emailAddress;
                existingUser.username = userData.username;
                existingUser.image = userData.imageUrl || '';
                await existingUser.save();
            }
            let token = generateToken(existingUser.email, existingUser._id);
            return res.status(201).json({ message: 'User with this clerkID already exists', isNowExist: true, token });
        }
        
        const newCreator = await Creator.create({
            clerkData: clerkID,
            email: userData.emailAddresses[0].emailAddress,
            username: userData.username,
            image: userData.imageUrl || '',
        });

        if (!newCreator) {
            return res.status(500).json({ message: 'Failed to create new user' });
        }
        let token = generateToken(newCreator.email, newCreator._id);
        res.status(201).json({ message: 'User has been created.', newCreator, isNowExist: true, token });
    } catch (error) {
        console.log("Register user error: ", error.message);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export default registerController