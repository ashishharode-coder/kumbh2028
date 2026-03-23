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
router.post("/", upload.single("image"), herosController.createHeros);
router.get("/", herosController.getAllHeros);
router.get("/:id", herosController.getSingleHeros);
router.put("/:id", upload.single("image"), herosController.updateHeros);
router.delete("/:id",herosController.deleteHeros);

export default router;
