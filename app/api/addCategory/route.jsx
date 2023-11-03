import { connectDB } from "@utils/database";
import Category from "@models/Category";
import multer from "multer";

const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../../../public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

connectDB();

export async function POST(req, res) {
  upload.single("logoFile");
  upload.single("bannerFile");

  try {
    const data = await req.formData();
    const name = data.get("name");
    const logoFile = data.get("logoFile");
    const isSocialMedia = data.get("isSocialMedia");
    const bannerFile = data.get("bannerFile");

    const newCategory = new Category({
      name,
      isSocialMedia, // Convert the string to boolean
      logoFile: logoFile ? `/uploads/${logoFile.name}` : null,
      bannerFile: bannerFile ? `/uploads/${bannerFile.name}` : null,
    });

    const savedCategory = await newCategory.save();

    return new Response({
      message: "Category added successfully",
      category: savedCategory,
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response({ message: "Could not add category", status: 500 });
  }
}
