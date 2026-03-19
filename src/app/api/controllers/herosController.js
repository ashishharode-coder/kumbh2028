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

// GET ALL
const getAllHeros = async (req, res) => {
    try {
        const data = await Heros.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET SINGLE
const getSingleHeros = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Heros.findById(id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//     try {
//         const id = req.params.id;

//         const title = req.body.title;
//         const subtitle = req.body.subtitle;
//         const description = req.body.description;

//         let updateData = {
//             title,
//             subtitle,
//             description
//         };

//         // image update (optional)
//         if (req.file) {
//             updateData.image = req.file.filename;
//         }

//         const result = await Heros.findByIdAndUpdate(
//             id,
//             updateData,
//             { new: true }
//         );

//         if (!result) {
//             return res.status(404).json({
//                 message: "Heros not found"
//             });
//         }

//         res.json({
//             message: "Heros Updated ✅",
//             data: result
//         });

//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         });
//     }
// };

// export const updateHeros = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const updateData = {
//             ...req.body,
//             ...(req.file && { image: req.file.filename })
//         };

//         const updated = await Heros.findByIdAndUpdate(
//             id,
//             updateData,
//             { returnDocument: "after" }
//         );

//         if (!updated) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Heros not found"
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: "Heros Updated check✅",
//             data: updated
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

//Updated DATA 
// export const updateHeros = async (req, res) => {
//     try {
//         const { id } = req.params;

//         console.log("BODY:", req.body);
//         console.log("FILE:", req.file);

//         let updateData = {};

//         if (req.body.title !== undefined) updateData.title = req.body.title;
//         if (req.body.subtitle !== undefined) updateData.subtitle = req.body.subtitle;
//         if (req.body.description !== undefined) updateData.description = req.body.description;

//         if (req.file) {
//             updateData.image = req.file.filename;
//         }

//         console.log("UPDATE DATA:", updateData);

//         const updated = await Heros.findByIdAndUpdate(
//             id,
//             { $set: updateData },
//             { returnDocument: "after" }
//         );

//         res.json({
//             success: true,
//             message: "Heros Updated ✅",
//             data: updated
//         });

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

export const updateHeros = async (req, res) => {
    try {
        const id = req.params.id;

        let updateData = {};

        if (req.body.title) updateData.title = req.body.title;
        if (req.body.subtitle) updateData.subtitle = req.body.subtitle;
        if (req.body.description) updateData.description = req.body.description;

        if (req.file) {
            updateData.image = req.file.filename;
        }

        const updated = await Heros.findByIdAndUpdate(
            id,
            updateData,
            { returnDocument: "after" }
        );

        res.json({
            message: "Updated Successfully ✅",
            data: updated
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export default {
    createHeros,
    getAllHeros,
    getSingleHeros,
    updateHeros
};