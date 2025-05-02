const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "complaint_images",
    allowed_formats: ["jpeg", "png", "jpg"],
  },
});

// Multer Upload Function
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

const uploadMiddleware = (req, res, next) => {
  console.log("✅ Middleware Reached!"); // 👀 Check if middleware is reached
  console.log("Request Body:", req.body);
  upload.single("image")(req, res, (err) => {
    if (err) {
      console.error("❌ File Upload Error:", err);
      return res
        .status(400)
        .json({ message: "File upload failed", error: err });
    }

    console.log("🖼️ Uploaded File:", req.file); // 👀 Check if file is uploaded
    next();
  });
};

module.exports = uploadMiddleware;
