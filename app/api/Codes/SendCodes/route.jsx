import nodemailer from "nodemailer";
import CardProduct from "@models/CardProduct";
import CardOrder from "@models/CardOrder";

export async function POST(request) {
  try {
    const formData = await request.json();
    const name = formData.name;
    const email = formData.email;
    const product = formData.product;
    const Token = JSON.parse(formData.Token);
    const code = product.cardCodes;
    const id = product._id;
    const username = Token.name;
    const usermail = Token.email;

    console.log(username);
    console.log(usermail);
    console.log(Token);

    const codeIndex = 0; // Change this index to send a specific code

    if (codeIndex < 0 || codeIndex >= code.length) {
      return Response.json({ message: "Invalid code index" }, 400);
    }

    if (codeIndex >= code.length) {
      return Response.json({ message: "Invalid code index" }, 400);
    }

    const selectedCode = code[codeIndex];

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Someone Order a code",
      text: `
      Name: ${name} 
      Email : ${email}
      Message text: 
      Someone Order a code`,
    };

    const mailOptions2 = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for ordering from us",
      text: `Hello ${name}, your redeem code is: ${selectedCode}`,
    };

    // Send the emails
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(mailOptions2);

    // Now, let's delete the selectedCode from the database
    const cardProductId = id; // Make sure to send the product's _id in the formData

    await CardProduct.findByIdAndUpdate(
      cardProductId,
      {
        $pull: { cardCodes: selectedCode },
      },
      { new: true }
    );

    // Create a new CardOrder entry
    const cardOrder = new CardOrder({
      username: username,
      email: usermail,
      name: name,
      category: product.category,
      categoryName: product.categoryName,
      price: product.price,
      cardCode: selectedCode,
    });
    await cardOrder.save();

    return Response.json({ message: "Success: email was sent" });
  } catch (error) {
    console.error("Email sending error:", error);
    return Response.json({ message: "COULD NOT SEND MESSAGE" }, 500);
  }
}
