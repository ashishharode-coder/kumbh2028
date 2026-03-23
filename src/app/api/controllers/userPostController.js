import Post from "../models/userPostModel.js";

const createPost = async (req, res) => {
    try {
        const { caption, location } = req.body;

        const post = await Post.create({
            userId: req.user?.id || null,
            caption,
            location,
            image: req.file?.filename || "",
            isApproved: false
        });

        res.status(201).json({
            message: "Post created (Pending Approval) ⏳",
            data: post
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default {
    createPost
}