import express from 'express';
import multer from 'multer';
import createBlogController from '../controllers/createBlog.controller.js';
import authenticate from '../middlewares/authenticate.middleware.js'
import reviewBlogController from '../controllers/reviewBlog.controller.js';
import likeBlogController from '../controllers/likeBlog.controller.js';
import unlikeBlogController from '../controllers/unlikeBlog.controller.js';
import saveBlogController from '../controllers/saveBlog.controller.js';
import unsaveBlogController from '../controllers/unsaveBlog.controller.js';
import reviewAppController from '../controllers/reviewApp.controller.js';

const blogRouter = express.Router();
const storage = multer.memoryStorage();
export const upload = multer({storage});

blogRouter.post('/blog/create', [authenticate, upload.single('image')], createBlogController);
blogRouter.post('/blog/review', authenticate, reviewBlogController);
blogRouter.put('/blog/like', authenticate, likeBlogController);
blogRouter.put('/blog/unlike', authenticate, unlikeBlogController);
blogRouter.put('/blog/save', authenticate, saveBlogController);
blogRouter.put('/blog/unsave', authenticate, unsaveBlogController);


blogRouter.post('/app/review', authenticate, reviewAppController);


export default blogRouter;