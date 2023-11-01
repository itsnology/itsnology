import multer from "multer";
const nextConnect = require("next-connect");

import { connectDB } from "@utils/database";
import Category from "@models/Category"; // Import your Category model

const upload = multer({ dest: "public/uploads/" }); // Define the upload directory

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry, something went wrong! ${error.message}` });
  },
});

apiRoute.use(upload.single("logoFile")); // Use multer to handle the logoFile field

apiRoute.post(async (req, res) => {
  try {
    await connectDB();
    const newCategory = new Category({
      categoryName: req.body.name,
      categoryBanner: req.body.categoryBanner, // File path or URL for the banner image
      categoryLogo: req.file ? `/uploads/${req.file.filename}` : null, // Store the logo image file path
    });

    const savedCategory = await newCategory.save();

    res.status(201).json({
      message: "Category created successfully",
      category: savedCategory,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Category creation failed", message: error.message });
  }
});

export default apiRoute;
