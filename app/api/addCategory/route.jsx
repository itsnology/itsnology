import { connectDB } from "@utils/database";
import Category from "@models/Category";

import multer from "multer";
const util = require("util"); // You need to use the 'util' module to promisify the upload function

const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationPath = path.resolve(__dirname, "../../../public/uploads");
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

connectDB(); // Promisify the multer upload function

export async function POST(req, next) {
  try {
    const data = await req.formData();
    const name = data.get("name");
    const logoFile = data.get("logoFile");
    const isSocialMedia = data.get("isSocialMedia");
    const bannerFile = data.get("bannerFile");

    console.log(data);
    console.log(logoFile);
    console.log(isSocialMedia);

    const newCategory = new Category({
      name,
      isSocialMedia, // Convert the string to boolean
      logoFile: logoFile ? logoFile.buffer.toString("base64") : "",
      bannerFile: bannerFile ? bannerFile.buffer.toString("base64") : "",
    });

    await newCategory.save();

    return Response.json(
      {
        message: "Category added successfully",
      },
      200
    );
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Could not add category" }, 500);
  }
}
