import express from "express";
import multer from "multer";
import postController from "../controllers/userPostController.js";

const router = express.Router();

// multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

// routes
router.post("/", upload.single("image"), postController.createPost);

export default router;