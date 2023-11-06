import { connectDB } from "@utils/database";
import { NextResponse } from "next/server";
import SocialProduct from "@models/SocialProduct";
import path from "path";
import { writeFile } from "fs/promises";

export const POST = async (req, res) => {
   const formData = await req.formData();

   const category = formData.get("category");
   const selectedProduct = formData.get("name");
   const description = formData.get("description");
   const options = JSON.parse(formData.get("options"));
   const photo = formData.get("image");
   const categoryName = formData.get("categoryName");

   if (!category || !selectedProduct || !options || !photo) {
      return NextResponse.json(
         { error: "Missing required fields." },
         { status: 400 }
      );
   }

   const bufferPhoto = Buffer.from(await photo.arrayBuffer());
   const filenamePhoto = Date.now() + photo.name.replaceAll(" ", "_");

   try {
      await writeFile(
         path.join(process.cwd(), "/public/uploads/" + filenamePhoto),
         bufferPhoto
      );
   } catch (error) {
      console.log("Error occured while writing photo file ", error);
      return NextResponse.json({ Message: "Failed", status: 500 });
   }

   try {
      await connectDB();
      const socialProductObj = new SocialProduct({
         category,
         categoryName: categoryName,
         name: selectedProduct,
         options: options,
         image: filenamePhoto,
         description: description,
      });
      await socialProductObj.save();
      return NextResponse.json({ Message: "Success", status: 201 });
   } catch (error) {
      console.log("Error occured while saving to database ", error);
      return NextResponse.json({ Message: "Failed", status: 500 });
   }
};
