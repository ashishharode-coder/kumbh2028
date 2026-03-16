import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    mobile: {
        type: String,
        required: true,
        match: [/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"]
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300
    }
});

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;