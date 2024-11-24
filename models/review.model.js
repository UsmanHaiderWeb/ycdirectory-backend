import mongoose, { Schema } from 'mongoose';

const reviewSchema = new Schema({
    reviewedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Creator',
        required: true
    },
    isRelatedToApp: {
        type: Boolean,
        default: false
    },
    content: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
    }
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;