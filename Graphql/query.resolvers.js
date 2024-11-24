import { clerkClient } from '@clerk/express'
import Creator from '../models/creator.model.js'
import Blog from '../models/blog.model.js'
import Review from '../models/review.model.js'

const QueryResolvers = {
    me: async (a, { clerkId }) => {
        let user = await Creator.findOne({clerkData: clerkId})
        return user;
    },
    getAllUsers : async () => await Creator.find(),
    getSingleUser: async (a, { id }) => await Creator.findOne({_id: id}),
    allBlogs: async () => await Blog.find(),
    TopCreators: async () => {
        const creators = await Creator.find();
        const shuffledCreators = creators.sort(() => 0.5 - Math.random());
        const slicedCreators = shuffledCreators.slice(0, 10);
        return slicedCreators;
    },
    TopBlogs: async () => {
        const blogs = await Blog.find();
        const shuffledBlogs = blogs.sort(() => 0.5 - Math.random());
        const slicedBlogs = shuffledBlogs.slice(0, 10);
        return slicedBlogs;
    },
    getSingleBlog: async (a, { id }) => await Blog.findOne({_id: id}),
    getSingleUserClerk: async (a, { id }) => await clerkClient.users.getUser(id),
    appReviews: async () => await Review.find({isRelatedToApp: true}),
}

export default QueryResolvers