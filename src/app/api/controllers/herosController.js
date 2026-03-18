import Heros from "../models/herosModel.js";

// CREATE
const createHeros = async (req, res) => {
    try {
        const { title, subtitle, description } = req.body;

        const hero = await Heros.create({
            title,
            subtitle,
            description,
            image: req.file?.filename || ""
        });

        res.status(201).json({
            success: true,
            message: "Hero created successfully",
            data: hero
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export default {
    createHeros
};