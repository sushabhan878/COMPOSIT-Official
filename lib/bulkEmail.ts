import nodemailer from "nodemailer";

/* --------------------------------
 * SMTP TRANSPORT (SAFE CONFIG)
 * --------------------------------*/
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: Number(process.env.SMTP_PORT) === 465, // auto-handle
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/* --------------------------------
 * TYPES
 * --------------------------------*/
interface SendBulkEmailParams {
  to: string[];
  subject: string;
  html: string;
  fromName?: string;
}

/* --------------------------------
 * BULK EMAIL SENDER (SAFE)
 * --------------------------------*/
export async function sendBulkEmail({
  to,
  subject,
  html,
  fromName = "Team COMPOSIT",
}: SendBulkEmailParams) {
  if (!to || to.length === 0) {
    throw new Error("Recipient list is empty");
  }

  // ✅ Verify SMTP first
  await transporter.verify();
  console.log("✅ SMTP verified");

  let successCount = 0;

  for (const email of to) {
    if (!email || !email.includes("@")) continue;

    try {
      await transporter.sendMail({
        from: `"${fromName}" <${process.env.SMTP_FROM}>`,
        to: email, // 👈 SEND INDIVIDUALLY
        subject,
        html,
      });

      successCount++;
      console.log(`📨 Sent to ${email}`);

      // ⏳ Rate limit protection
      await new Promise((res) => setTimeout(res, 300));
    } catch (error) {
      console.error(`❌ Failed for ${email}:`, error);
    }
  }

  console.log(`✅ Bulk email done. Sent: ${successCount}/${to.length}`);
}
