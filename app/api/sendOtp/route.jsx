import nodemailer from "nodemailer";

export async function POST(request) {
   try {
      const data = await request.json();
      const email = data.email;
      const otp = data.generatedOtp;


      const transporter = nodemailer.createTransport({
         service: "Gmail",
         auth: {
            user: process.env.EMAILNODE,
            pass: process.env.PASSWORDNODE,
         },
      });

      const mailOptions = {
         from: process.env.EMAILNODE,
         to: email,
         subject: "OTP Verification",
         text: `Your OTP for verification is: ${otp}`,
      };

      await transporter.sendMail(mailOptions);

      return Response.json({ message: "Success: email was sent", otp });
   } catch (error) {
      console.error("Email sending error:", error);
      return Response.json({ message: "COULD NOT SEND MESSAGE" }, 500);
   }
}
