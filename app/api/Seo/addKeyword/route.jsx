import { connectDB } from "@utils/database";
import Keyword from "@models/Keyword";

export const POST = async (req) => {
  // const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await connectDB();
    const { name } = await req.json();
    await Keyword.create({ name });

    return new Response("secuss", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
