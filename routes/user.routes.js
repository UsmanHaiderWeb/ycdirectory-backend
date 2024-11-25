import { clerkClient } from '@clerk/express'
import express from 'express';
import registerController from '../controllers/register.controller.js';
import likeCreatorController from '../controllers/likeCreator.controller.js';
import unlikeCreatorController from '../controllers/unlikeCreator.controller.js';
import Creator from '../models/creator.model.js';
import Blog from '../models/blog.model.js';
import authenticate from '../middlewares/authenticate.middleware.js'

const userRouter = express.Router();

userRouter.post('/user/create', registerController);
userRouter.post('/creator/like', authenticate, likeCreatorController);
userRouter.post('/creator/unlike', authenticate, unlikeCreatorController);

userRouter.get('/check', async (req, res) => {
    let user = await Creator.find()
    // let user = await clerkClient.users.getUser('user_2pC5B2ivLrEWTCu7WGEdnmPUE4X');
    // user.forEach(async(e) => {
    //     e.recommendedBy = [];
    //     e.likedCreators = [];
    //     await e.save()
    // });
    res.send(user)
})

export default userRouter;