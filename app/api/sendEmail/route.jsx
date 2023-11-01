import nodemailer from "nodemailer";

export async function POST(request) {
   try {
      const formData = await request.json();
      const name = formData.name;
      const email = formData.email;
      const subject = formData.subject;
      const messageText = formData.messageText;
      console.log(email);

      const transporter = nodemailer.createTransport({
         service: "Gmail",
         auth: {
            user: process.env.EMAILNODE,
            pass: process.env.PASSWORDNODE,
         },
      });

      const mailOptions = {
         from: process.env.EMAILNODE,
         to: process.env.EMAILNODE,
         subject: subject,
         html: `
          <div style="background-color: #f5f5f5; padding: 16px; border-radius: 8px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
            <p style="font-size: 18px; font-weight: bold; margin-bottom: 16px;">New message from ${name}</p>
            <p style="margin-bottom: 8px;"><strong>Name:</strong> ${name}</p>
            <p style="margin-bottom: 8px;"><strong>Email:</strong> ${email}</p>
            <p style="margin-bottom: 8px;"><strong>Message:</strong></p>
            <p style="margin-bottom: 16px;">${messageText}</p>
          </div>
        `,
      };
      const mailOptions2 = {
         from: process.env.EMAILNODE,
         to: email,
         subject: "التواصل مع الدعم الفني",
         html: `
          <div style="background-color: #f5f5f5; padding: 16px; border-radius: 8px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);" dir="rtl">
            <p style="font-size: 18px; font-weight: bold; margin-bottom: 16px;">مرحبًا ${name},</p>
            <p style="margin-bottom: 16px;">بفضل الله، قد استلمت فرقتنا الكريمة شكوتكم بكل اهتمام وجدية. يسرنا أن نعلمكم أننا قد بدأنا في دراسة الشكوى التي تقدمتم بها، وسنعمل جاهدين على حلها في أقرب وقت ممكن.</p>
            <p style="margin-bottom: 16px;">فيما بين الحين والآخر، ستتلقون تحديثات منا حول تقدم العمل على شكوتكم. إذا كانت لديكم أي استفسارات إضافية أو تحتاجون إلى مزيد من المعلومات، فلا تترددوا في التواصل معنا في أي وقت.</p>
            <p style="margin-bottom: 16px;">شكرًا مجددًا على ثقتكم بخدماتنا، ونتطلع إلى تقديم الدعم والحلول المناسبة لكم.</p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      await transporter.sendMail(mailOptions2);

      return Response.json({ message: "Success: email was sent" });
   } catch (error) {
      console.error("Email sending error:", error);
      return Response.json({ message: "COULD NOT SEND MESSAGE" }, 500);
   }
}
