import { connectDB } from "@utils/database";
import Category from "@models/Category";

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the directory where you want to save the uploaded files
    cb(null, "../../../public/uploads"); // 'uploads/' is the directory name
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

export async function POST(req) {
  await connectDB();

  try {
    upload.any()(req, async (err) => {
      if (err) {
        console.error(err);
        return Response.json({ message: "Error uploading file" }, 500);
      }

      const { name, isSocialMedia } = await req.body; // Use req.body instead of req.json()

      const logoFile = req.files.find((file) => file.fieldname === "logoFile");
      const bannerFile = req.files.find(
        (file) => file.fieldname === "bannerFile"
      );

      if (!name) {
        return Response.json({ message: "Name is required" }, 400);
      }

      const newCategory = new Category({
        name,
        isSocialMedia: isSocialMedia === "true", // Convert the string to boolean
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
    });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Could not add category" }, 500);
  }
}
