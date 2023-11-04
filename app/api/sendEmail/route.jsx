import nodemailer from "nodemailer";

export async function POST(request) {
   try {
      const formData = await request.json();
      const name = formData.name;
      const email = formData.email;
      const subject = formData.subject;
      const messageText = formData.messageText;

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
         subject: subject,
         text: `
      Name: ${name} 
      Email : ${email}
      Message text: 
      ${messageText}`,
      };
      const mailOptions2 = {
         from: process.env.EMAIL_USER,
         to: email,
         subject: "التواصل مع الدعم الفني",
         text: `
      ،${name}مرحبا
بفضل الله، قد استلمت فرقتنا الكريمة شكوتكم بكل اهتمام وجدية. يسرنا أن نعلمكم أننا قد بدأنا في دراسة الشكوى التي تقدمتم بها، وسنعمل جاهدين على حلها في أقرب وقت ممكن.

فيما بين الحين والآخر، ستتلقون تحديثات منا حول تقدم العمل على شكوتكم. إذا كانت لديكم أي استفسارات إضافية أو تحتاجون إلى مزيد من المعلومات، فلا تترددوا في التواصل معنا في أي وقت.

شكرًا مجددًا على ثقتكم بخدماتنا، ونتطلع إلى تقديم الدعم والحلول المناسبة لكم.

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
