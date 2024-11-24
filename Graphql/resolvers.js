import { clerkClient } from '@clerk/express';
import Creator from '../models/creator.model.js'
import Blog from '../models/blog.model.js'
import Mutations from './mutations.resolvers.js';
import QueryResolvers from './query.resolvers.js';

const resolvers = {
    Query: QueryResolvers,
    Mutation: Mutations,
    User: {
        clerkData: async (user) => await clerkClient.users.getUser(user.clerkData),
        recommendedBy: async (user) => {
            user = await user.populate('recommendedBy');
            return user.recommendedBy;
        },
        likedCreators: async (user) => {
            user = await user.populate('likedCreators');
            return user.likedCreators;
        },
        blogs: async (user) => {
            user = await user.populate('blogs');
            return user.blogs;
        },
        likedBlogs: async (user) => {
            user = await user.populate('likedBlogs');
            return user.likedBlogs;
        },
        savedBlogs: async (user) => {
            user = await user.populate('savedBlogs');
            return user.savedBlogs;
        },
        reviews: async (user) => {
            user = await user.populate('reviews');
            return user.reviews;
        },
    },
    ClerkUser: {
        primaryEmailAddressId: async (user) => {
            let emailData = await clerkClient.emailAddresses.getEmailAddress(user.primaryEmailAddressId)
            return emailData.emailAddress;
        },
    },
    Blog: {
        createdBy: async (parent) => await Creator.findOne({_id: parent.createdBy}),
        likedBy: async (parent) => {
            let user = await parent.populate('likedBy');
            return user.likedBy;
        },
        reviews: async (parent) => {
            let user = await parent.populate('reviews');
            return user.reviews;
        },
    },
    Review: {
        reviewedBy: async (parent) => {
            let user = await parent.populate('reviewedBy');
            return user.reviewedBy;
        },
    }
}

export default resolvers