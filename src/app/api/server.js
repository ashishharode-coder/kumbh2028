import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js"

dotenv.config();

const app = express();

app.use(express.json());

// connect database
connectDB();

// routes
app.use("/", userRoutes);

//Opt
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server started on port " + process.env.PORT);
});
