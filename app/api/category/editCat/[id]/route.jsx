import { connectDB } from "@utils/database";
import Category from "@models/Category";
import { NextResponse } from "next/server";
import path from "path";
import { writeFile, unlink } from "fs/promises";

//Patch"

export const PATCH = async (req, { params }) => {
   const formData = await req.formData();

   const name = formData.get("name");
   const logoFile = formData.get("logoFile");
   const bannerFile = formData.get("bannerFile");

   if (!name) {
      return NextResponse.json(
         { error: "Missing required fields." },
         { status: 400 }
      );
   }

   let filenameLogo = "";
   if (logoFile) {
      const bufferLogo = Buffer.from(await logoFile.arrayBuffer());
      filenameLogo = Date.now() + logoFile.name.replaceAll(" ", "_");

      try {
         await writeFile(
            path.join(process.cwd(), "/public/uploads/" + filenameLogo),
            bufferLogo
         );
      } catch (error) {
         console.log("Error occurred while writing logo file ", error);
         return NextResponse.json({ Message: "Failed", status: 500 });
      }
   }

   let filenameBanner = "";
   if (bannerFile) {
      const bufferBanner = Buffer.from(await bannerFile.arrayBuffer());
      filenameBanner = Date.now() + bannerFile.name.replaceAll(" ", "_");

      try {
         await writeFile(
            path.join(process.cwd(), "/public/uploads/" + filenameBanner),
            bufferBanner
         );
      } catch (error) {
         console.log("Error occurred while writing banner file ", error);
         return NextResponse.json({ Message: "Failed", status: 500 });
      }
   }

   try {
      await connectDB();

      const Existingprompt = await Category.findById(params.id);
      console.log("Existingprompt", Existingprompt);
      console.log("params.id", params.id);
      if (!Existingprompt)
         return new Response("prompt not found", { status: 404 });

      // delete previous image files if new files are provided
      if (filenameLogo && Existingprompt.logoFile) {
         const prevLogoPath = path.join(
            process.cwd(),
            "/public/uploads/" + Existingprompt.logoFile
         );
         await unlink(prevLogoPath);
      }

      if (filenameBanner && Existingprompt.bannerFile) {
         const prevBannerPath = path.join(
            process.cwd(),
            "/public/uploads/" + Existingprompt.bannerFile
         );
         await unlink(prevBannerPath);
      }

      Existingprompt.name = name;
      if (filenameLogo) Existingprompt.logoFile = filenameLogo;
      if (filenameBanner) Existingprompt.bannerFile = filenameBanner;

      await Existingprompt.save();
      return NextResponse.json({ Message: "Success", status: 201 });
   } catch (error) {
      console.log("Error occurred while saving to database ", error);
      return NextResponse.json({ Message: "Failed", status: 500 });
   }
};

//DELETE

export const DELETE = async (req, { params }) => {
   try {
      await connectDB();
      const Existingprompt = await Category.findById(params.id);
      if (!Existingprompt)
         return new Response("prompt not found", { status: 404 });

      // delete image files
      if (Existingprompt.logoFile) {
         const prevLogoPath = path.join(
            process.cwd(),
            "/public/uploads/" + Existingprompt.logoFile
         );
         await unlink(prevLogoPath);
      }

      if (Existingprompt.bannerFile) {
         const prevBannerPath = path.join(
            process.cwd(),
            "/public/uploads/" + Existingprompt.bannerFile
         );
         await unlink(prevBannerPath);
      }

      await Category.findByIdAndDelete(params.id);
      return new Response("prompt deleted", { status: 200 });
   } catch (error) {
      return new Response("there is problem with this fct ", { status: 500 });
   }
};
