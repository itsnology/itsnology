import { connectDB } from "@utils/database";
import Rating from "@models/Rating";

export const POST = async (req) => {
  // const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await connectDB();
    const { name, RatingStars, Review } = await req.json();
    await Rating.create({ name, RatingStars, Review });

    return new Response("secuss", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
