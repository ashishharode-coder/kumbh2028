import express from "express";
import multer from "multer";
import herosController from "../controllers/herosController.js";

const router = express.Router();

// multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });

// routes
router.post("/heros", upload.single("image"), herosController.createHeros);
router.get("/heros", herosController.getAllHeros);
export default router;
