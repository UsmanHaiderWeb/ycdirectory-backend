const typeDefs = `
    type Query {
        getAllUsers: [User]
        getSingleUser(id: ID!): User
        TopCreators: [User]
        getSingleUserClerk(id: ID!): ClerkUser
        me(clerkId: String!): User
        allBlogs: [Blog]
        TopBlogs: [Blog]
        getSingleBlog(id: ID!): Blog
        appReviews: [Review]
    }
    
    type User {
        _id: ID
        clerkData: ClerkUser
        email: String
        image: String
        username: String
        isPaidUser: Boolean!
        recommendedBy: [User]
        likedCreators: [User]
        blogs: [Blog]
        likedBlogs: [Blog]
        savedBlogs: [Blog]
        reviews: [Review]
    }
    
    type Blog {
        _id: ID!
        title: String
        caption: String
        description: String
        image: String
        createdBy: User
        likedBy: [User]
        reviews: [Review]
        categories: String
        tags: String
        createdAt: String
    }
    
    type Review {
        _id: ID
        reviewedBy: User
        isRelatedToApp: Boolean
        content: String
        stars: String
    }
    
    type ClerkUser {
        id: ID!
        banned: Boolean!
        locked: Boolean!
        createdAt: String!
        updatedAt: String!
        imageUrl: String!
        hasImage: Boolean!
        username: String
        firstName: String
        lastName: String
        primaryEmailAddressId: String
    }

    type Mutation {
        likeBlog(userID: String!, blogID: String!): ClerkUser
        updateBlog: Blog
        deleteBlog: Blog
    }
    
    input BlogInputData {
        title: String!
        caption: String!
        description: String!
        image: String!
        categories: String!
        tags: String
    }
      
`

export default typeDefs;