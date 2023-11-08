import nodemailer from "nodemailer";
import User from "@models/User";
import SocialOrder from "@models/SocialOrder"; // Import the SocialOrder model

export async function POST(request) {
   try {
      const formData = await request.json();
      const link = formData.link;
      const email = formData.email;
      const product = formData.product;
      const Token = formData.Token;
      const productName = product.name;
      const usermail = Token.email;
      const selectedOption = formData.selectedOption;

      // Retrieve the user's name based on the provided token email
      const user = await User.findOne({ email: usermail });
      const username = user.name;

      console.log(username);
      console.log(link);
      console.log(Token);

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
         text: `Hello ${username}, your Social media service ${productName} with ${selectedOption} for this Link ${link} that you choose will be delivered to you within 24 hours.`,
      };

      // Send the emails
      await transporter.sendMail(mailOptions);
      await transporter.sendMail(mailOptions2);

      // Create a new SocialOrder entry
      const socialOrder = new SocialOrder({
         productName: productName,
         user: user,
         price: product.options.find((option) => option.name === selectedOption)
            .price,
         linkpost: link,
         selectedOption: selectedOption,
      });
      await socialOrder.save();

      // Now, update the User's orders array
      user.orders.push(socialOrder._id);
      await user.save();

      return Response.json({ message: "Success: email was sent" });
   } catch (error) {
      console.error("Email sending error:", error);
      return Response.json({ message: "COULD NOT SEND MESSAGE" }, 500);
   }
}
