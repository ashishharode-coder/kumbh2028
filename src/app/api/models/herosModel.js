import mongoose from "mongoose";

const herosSchema = new mongoose.Schema({
    title: { type: String },
    subtitle: { type: String },
    description: { type: String },
    image: { type: String }
});

const Heros = mongoose.model("heros", herosSchema);

export default Heros;