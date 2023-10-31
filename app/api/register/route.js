import { connectDB } from "@utils/database";
import User from "@models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req) => {
   await connectDB();
   const { name, email, password } = await req.json();
   const hashedPassword = await bcrypt.hash(password, 10);
   try {
      const newUser = User.create({ name, email, password: hashedPassword });
      await newUser.save();
      return new Response(JSON.stringify(newUser), { status: 200 });
   } catch (error) {
      console.log(error);
      return new Response(JSON.stringify(error), { status: 500 });
   }
};
