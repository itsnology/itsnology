import { NextResponse, NextRequest } from "next/server";

import nodemailer from "nodemailer";

export async function POST(request) {
  if (request.method === "POST") {
    const { name, email, subject, message } = request.body;

    // Create a transporter object using your email service provider (e.g., Gmail)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "metiriabdou@gmail.com",
        pass: "eibqxahenqglzjna",
      },
      debug: true,
    });

    // Setup email data
    const mailOptions = {
      from: "your-email@gmail.com",
      to: "metiriabdou@gmail.com", // Change to your recipient's email address
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    const sendMailPromise = new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve("Email sent");
        } else {
          reject(err.message);
        }
      });
    });

    try {
      await sendMailPromise();
      return NextResponse.json({ message: "Email sent" });
    } catch (err) {
      return NextResponse.json({ error: err }, { status: 500 });
    }
  }
}
