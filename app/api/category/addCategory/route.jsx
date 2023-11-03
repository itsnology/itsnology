import { connectDB } from "@utils/database";
import Category from "@models/Category";
import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export const POST = async (req, res) => {
   const formData = await req.formData();

   const name = formData.get("name");
   const logoFile = formData.get("logoFile");
   const isSocialMedia = formData.get("isSocialMedia");
   const bannerFile = formData.get("bannerFile");

   if (!name || !logoFile || !isSocialMedia || !bannerFile) {
      return NextResponse.json(
         { error: "Missing required fields." },
         { status: 400 }
      );
   }

   const bufferLogo = Buffer.from(await logoFile.arrayBuffer());
   const filenameLogo = Date.now() + logoFile.name.replaceAll(" ", "_");
   console.log(filenameLogo);
   try {
      await writeFile(
         path.join(process.cwd(), "public/uploads/" + filenameLogo),
         bufferLogo
      );
   } catch (error) {
      console.log("Error occured while writing logo file ", error);
      return NextResponse.json({ Message: "Failed", status: 500 });
   }

   const bufferBanner = Buffer.from(await bannerFile.arrayBuffer());
   const filenameBanner = Date.now() + bannerFile.name.replaceAll(" ", "_");

   console.log(filenameBanner);
   try {
      await writeFile(
         path.join(process.cwd(), "/public/uploads/" + filenameBanner),
         bufferBanner
      );
   } catch (error) {
      console.log("Error occured while writing banner file ", error);
      return NextResponse.json({ Message: "Failed", status: 500 });
   }

   try {
      await connectDB();
      const category = new Category({
         name,
         logoFile: filenameLogo,
         isSocialMedia,
         bannerFile: filenameBanner,
      });
      await category.save();
      return NextResponse.json({ Message: "Success", status: 201 });
   } catch (error) {
      console.log("Error occured while saving to database ", error);
      return NextResponse.json({ Message: "Failed", status: 500 });
   }
};
