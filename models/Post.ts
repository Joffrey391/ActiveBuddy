import { Schema, models, model } from "mongoose"

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    tags: {
        type: [String],
    },
    thumbnail: {
        type: Object,
        url: String,
        public_id: String,
    },
    meta: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    },
    {
        timestamps: true,
    },
);

const Post = models?.Post || model('Post', PostSchema);
export default Post;