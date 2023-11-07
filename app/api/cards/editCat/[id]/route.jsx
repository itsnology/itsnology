import { connectDB } from "@utils/database";
import { NextResponse } from "next/server";
import CardProduct from "@models/CardProduct";
import path from "path";
import { writeFile, unlink } from "fs/promises";

//Patch"

export const PATCH = async (req, { params }) => {
  const formData = await req.formData();

  const category = formData.get("category");
  const selectedProduct = formData.get("name");
  const price = formData.get("price");
  const codes = JSON.parse(formData.get("cardCodes"));
  const photo = formData.get("image");
  const categoryName = formData.get("categoryName");
  if (!category || !selectedProduct || !price || !photo) {
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

    const Existingprompt = await CardProduct.findById(params.id);
    console.log("Existingprompt", Existingprompt);
    console.log("params.id", params.id);
    if (!Existingprompt)
      return new Response("prompt not found", { status: 404 });

    // delete previous image files
    const prevLogoPath = path.join(
      process.cwd(),
      "/public/uploads/" + Existingprompt.image
    );

    await unlink(prevLogoPath);

    Existingprompt.name = selectedProduct;
    Existingprompt.price = price;
    Existingprompt.cardCodes = codes;
    Existingprompt.image = filenamePhoto;
    await Existingprompt.save();
    return NextResponse.json({ Message: "Success", status: 201 });
  } catch (error) {
    console.log("Error occured while saving to database ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};

//DELETE

export const DELETE = async (req, { params }) => {
  try {
    await connectDB();
    const Existingprompt = await CardProduct.findById(params.id);
    if (!Existingprompt)
      return new Response("prompt not found", { status: 404 });

    // delete image files
    const prevLogoPath = path.join(
      process.cwd(),
      "/public/uploads/" + Existingprompt.image
    );

    await unlink(prevLogoPath);

    await CardProduct.findByIdAndDelete(params.id);
    return new Response("prompt deleted", { status: 200 });
  } catch (error) {
    return new Response("there is problem with this fct ", { status: 500 });
  }
};
