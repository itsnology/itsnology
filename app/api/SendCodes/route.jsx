import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const formData = await request.json();
    const name = formData.name;
    const email = formData.email;
    const Product = formData.product;
    const code = Product.cardCodes;

    console.log(Product);
    console.log(code);
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
      text: ` Hello ${name} your redeem code is : ${code}`,
    };

    await transporter.sendMail(mailOptions);
    await transporter.sendMail(mailOptions2);

    return Response.json({ message: "Success: email was sent" });
  } catch (error) {
    console.error("Email sending error:", error);
    return Response.json({ message: "COULD NOT SEND MESSAGE" }, 500);
  }
}
