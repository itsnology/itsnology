// pages/api/getCardsWithNoCardCodes.js

import CardProduct from "@models/CardProduct"; // Import your CardProduct model

export async function GET(req, res) {
  try {
    // Fetch card products with no cardCodes
    const cardProducts = await CardProduct.find({
      cardCodes: { $size: 0 },
    });
    console.log(cardProducts);
    return new Response(JSON.stringify(cardProducts), { status: 200 });
  } catch (error) {
    return new Response("Error fetching card products", {
      status: 500,
    });
  }
}
