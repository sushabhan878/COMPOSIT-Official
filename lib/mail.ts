import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // App Password
  },
});

export async function sendOTPEmail(email: string, otp: string) {
  await transporter.sendMail({
    from: `"Welcome to COMPOSIT 2026" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Your OTP Verification Code for COMPOSIT 2026 ✅",
    html: `
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to COMPOSIT 2026</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f6f8;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    table {
      border-spacing: 0;
    }
    img {
      border: 0;
    }
    .container {
      max-width: 600px;
      margin: auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    }
    .header {
      background: linear-gradient(135deg, #111827, #1f2933);
      padding: 30px;
      text-align: center;
      color: #ffffff;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      letter-spacing: 1px;
    }
    .content {
      padding: 35px;
      color: #333333;
      line-height: 1.6;
    }
    .content h2 {
      margin-top: 0;
      color: #111827;
    }
    .otp-box {
      margin: 30px 0;
      background-color: #f9fafb;
      border: 2px dashed #4f46e5;
      border-radius: 10px;
      text-align: center;
      padding: 20px;
    }
    .otp {
      font-size: 36px;
      letter-spacing: 8px;
      font-weight: bold;
      color: #4f46e5;
    }
    .about {
      background-color: #f3f4f6;
      border-radius: 10px;
      padding: 20px;
      margin-top: 30px;
    }
    .about h3 {
      margin-top: 0;
      color: #111827;
    }
    .footer {
      text-align: center;
      padding: 25px;
      font-size: 13px;
      color: #6b7280;
      background-color: #f9fafb;
    }
    .highlight {
      color: #4f46e5;
      font-weight: 600;
    }
    @media (max-width: 600px) {
      .content {
        padding: 25px;
      }
      .otp {
        font-size: 30px;
        letter-spacing: 6px;
      }
    }
  </style>
</head>
<body>

  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 30px 10px;">
        <table class="container" width="100%">
          
          <!-- Header -->
          <tr>
            <td class="header">
              <h1>Welcome to COMPOSIT 2026</h1>
              <p style="margin: 8px 0 0;">The Annual Materials Science & Metallurgy Fest</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="content">
              <h2>Hello ${email} 👋</h2>
              <p>
                We’re thrilled to have you onboard! Thank you for registering for 
                <span class="highlight">COMPOSIT 2026</span>.
              </p>

              <p>
                To complete your verification, please use the OTP below.  
                This OTP is valid for the next <strong>10 minutes</strong>.
              </p>

              <!-- OTP -->
              <div class="otp-box">
                <div class="otp">${otp}</div>
                <p style="margin: 10px 0 0; color: #6b7280;">
                  Do not share this code with anyone
                </p>
              </div>

              <!-- About COMPOSIT -->
              <div class="about">
                <h3>About COMPOSIT 2026</h3>
                <p>
                  COMPOSIT is the annual technical fest of the 
                  <strong>Department of Materials Science & Metallurgy</strong>,
                  bringing together innovation, research, and creativity.
                </p>
                <p>
                  From technical competitions and workshops to guest lectures,
                  COMPOSIT 2026 promises an unforgettable experience for curious minds
                  across the nation.
                </p>
              </div>

              <p style="margin-top: 30px;">
                If you didn’t initiate this request, you can safely ignore this email.
              </p>

              <p>
                Looking forward to seeing you at COMPOSIT 2026! 🚀
              </p>

              <p style="margin-top: 25px;">
                Warm regards,<br />
                <strong>Team COMPOSIT</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="footer">
              <p>
                © 2026 COMPOSIT. All rights reserved.
              </p>
              <p>
                This is an automated email — please do not reply.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>

    `,
  });
}
