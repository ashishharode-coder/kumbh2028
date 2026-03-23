import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    image: { type: String },
    caption: { type: String },
    location: { type: String },
    isApproved: { type: Boolean, default: false }
}, { timestamps: true });

const Post = mongoose.model("posts", postSchema);

export default Post; 