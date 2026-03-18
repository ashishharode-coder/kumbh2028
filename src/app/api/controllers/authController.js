import OTP from "../models/otpModel.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// SEND OTP
export const sendOtp = async (req, res) => {

  const { mobile } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000);

  await OTP.create({
    mobile,
    otp
  });

  console.log("OTP:", otp);

  res.json({
    message: "OTP Sent Successfully"
  });
};


export const verifyOtp = async (req, res) => {

  const { mobile, otp } = req.body;

  // predefined OTP
  if (otp === "0987") {

    // const user = await User.findOne({ mobile });

    // if (!user) {
    //   return res.status(400).json({
    //     message: "Mobile number not registered"
    //   });
    // }

    const token = jwt.sign(
      { id: user._id },
      "SECRET_KEY",
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login Success (Test OTP)",
      token,
      user
    });
  }

  // normal OTP check
  const otpRecord = await OTP.findOne({ mobile, otp });

  if (!otpRecord) {
    return res.status(400).json({
      message: "Invalid OTP"
    });
  }

  const user = await User.findOne({ mobile });

  if (!user) {
    return res.status(400).json({
      message: "Mobile number not registered"
    });
  }

  const token = jwt.sign(
    { id: user._id },
    "SECRET_KEY",
    { expiresIn: "7d" }
  );

  res.json({
    message: "Login Success",
    token,
    user
  });
};