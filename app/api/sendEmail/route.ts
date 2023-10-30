import { NextApiResponse, NextApiRequest } from "next";
import nodemailer from "nodemailer";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Your POST request handling logic here
    const otp = Math.floor(100000 + Math.random() * 900000);
    const email = "abdouannabi81@gmail.com";
    console.log(email);

    // Create a transporter object using your email service provider (e.g., Gmail)
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "metiriabdou@gmail.com",
        pass: "vjkl koog gbwh wroy",
      },
    });

    // Setup email data
    const mailOptions = {
      from: "metiriabdou@gmail.com",
      to: email, // Change to your recipient's email address
      subject: "OTP Verification",
      text: `Your OTP for verification is: ${otp}`,
    };

    // Send email
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully", otp });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
