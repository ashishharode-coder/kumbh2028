import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String
    },
    email: {
        type: String
    }
});

const User = mongoose.model("users", userSchema);

export default User;