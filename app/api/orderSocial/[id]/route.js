import { connectDB } from "@utils/database";
import CardOrder from "@models/CardOrder";
import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export const POST = async (req, res) => {
   const formData = await req.formData();

   const productName = formData.get("productName");
   const price = formData.get("price");
   const cardCode = formData.get("cardCode");

   if (!productName || !price || !cardCode) {
      return NextResponse.json(
         { error: "Missing required fields." },
         { status: 400 }
      );
   }

   try {
      await connectDB();
      const cardOrderObj = new CardOrder({
         productName,
         price,
         cardCode,
      });
      await cardOrderObj.save();
      return NextResponse.json({ Message: "Success", status: 201 });
   } catch (error) {
      console.log("Error occured while saving to database ", error);
      return NextResponse.json({ Message: "Failed", status: 500 });
   }
};
