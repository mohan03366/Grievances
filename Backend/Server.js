const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();
connectDB(); // MongoDB se connect hone ke liye
const app = express();
app.use(express.json()); // JSON data handle karne ke liye
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend origin
    credentials: true, // 🔥 VERY IMPORTANT
  })
); // CORS enable karne ke liye
//app.use(morgan("dev"));

app.use(cookieParser());

//app.use(fileUpload({ useTempFiles: true })); // File upload handle karega

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Mount User Routes
app.use("/api/users", userRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/admin", adminRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
