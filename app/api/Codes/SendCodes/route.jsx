import nodemailer from "nodemailer";
import CardProduct from "@models/CardProduct";
import CardOrder from "@models/CardOrder";
import User from "@models/User";

export async function POST(request) {
  try {
    const formData = await request.json();
    const { name: username, email, product } = formData;
    const {
      name: productName,
      cardCodes,
      _id: cardProductId,
      category,
      categoryName,
      price,
    } = product;

    const Token = JSON.parse(formData.Token);
    const usermail = Token.email;

    if (!cardCodes || cardCodes.length === 0) {
      return Response.json({ message: "No available codes" }, 400);
    }

    const codeIndex = 0; // Change this index to send a specific code

    if (codeIndex < 0 || codeIndex >= cardCodes.length) {
      return Response.json({ message: "Invalid code index" }, 400);
    }

    const selectedCode = cardCodes[codeIndex];

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
      Name: ${username} 
      Email : ${email}
      Message text: 
      Someone Order a code`,
    };

    const mailOptions2 = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for ordering from us",
      text: `Hello ${username}, your redeem code is: ${selectedCode}`,
    };

    await transporter.sendMail(mailOptions);
    await transporter.sendMail(mailOptions2);

    await CardProduct.findByIdAndUpdate(
      cardProductId,
      { $pull: { cardCodes: selectedCode } },
      { new: true }
    );

    const cardOrder = new CardOrder({
      productName,
      username,
      email: usermail,
      category,
      categoryName,
      price,
      cardCode: selectedCode,
    });
    await cardOrder.save();

    const user = await User.findOne({ email: usermail });
    user.orders.push(cardOrder._id);
    await user.save();

    return Response.json({ message: "Success: email was sent" });
  } catch (error) {
    console.error("Email sending error:", error);
    return Response.json({ message: "COULD NOT SEND MESSAGE" }, 500);
  }
}
