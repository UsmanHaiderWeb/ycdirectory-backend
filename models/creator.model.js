import mongoose, { Schema } from 'mongoose';

const creatorSchema = new Schema({
    clerkData: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    image: String,
    isPaidUser: {
        type: Boolean,
        default: false
    },
    recommendedBy: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Creator'
        }
    ],
    likedCreators: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Creator'
        }
    ],
    blogs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ],
    likedBlogs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ],
    savedBlogs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ],
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
}, {timestamps: true});

const Creator =  mongoose.model('Creator', creatorSchema);
export default Creator;