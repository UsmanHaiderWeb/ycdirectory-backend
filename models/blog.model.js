import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Creator',
        required: true
    },
    likedBy: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Creator',
        }
    ],
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review',
        }
    ],
    categories: String,
    tags: String,
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;