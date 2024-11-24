import { clerkClient } from "@clerk/express";

const Mutations = {
    likeBlog,
    updateBlog: async (data) => {},
    deleteBlog: async (data) => {},
}

export default Mutations


async function likeBlog(_, {userID, blogID}) {
    try {        
    } catch (error) {
        return undefined;
    }
}