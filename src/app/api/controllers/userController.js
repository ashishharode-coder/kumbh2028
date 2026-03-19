import User from "../models/userModel.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();

        console.log("Users from DB:", users);
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};