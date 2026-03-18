import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
app.use(express.json());

// connect database
connectDB();

// static image access
app.use("/uploads", express.static("uploads"));

// import routes
import herosRoutes from "./routes/herosRoutes.js"
app.use("/api", herosRoutes);

//Opt Login user 
import authRoutes from "./routes/authRoutes.js"
app.use("/api/auth", authRoutes);

//user routes
import userRoutes from "./routes/userRoutes.js";
app.use("/", userRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server started on port " + process.env.PORT);
});
