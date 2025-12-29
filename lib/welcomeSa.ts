import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // App Password
  },
});

export async function sendWelcomeSAEmail(
  email: string,
  referralLink: string,
  name: string,
  saId: string
) {
  await transporter.sendMail({
    from: `"Team COMPOSIT" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Welcome to COMPOSIT 2026 ✅",
    html: `
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome Student Ambassador</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #0f172a;
      font-family: Arial, Helvetica, sans-serif;
      color: #e5e7eb;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #020617;
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.45);
    }
    .header {
      padding: 30px;
      text-align: center;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
    }
    .header h1 {
      margin: 0;
      font-size: 26px;
      color: #ffffff;
    }
    .header p {
      margin-top: 8px;
      font-size: 14px;
      opacity: 0.9;
    }
    .content {
      padding: 30px;
    }
    .content h2 {
      margin-top: 0;
      color: #ffffff;
      font-size: 22px;
    }
    .content p {
      line-height: 1.7;
      font-size: 15px;
      color: #d1d5db;
    }
    .info-box {
      background-color: #020617;
      border: 1px solid #1e293b;
      padding: 18px;
      border-radius: 10px;
      margin: 22px 0;
    }
    .info-box p {
      margin: 8px 0;
      font-size: 14px;
    }
    .info-box strong {
      color: #a5b4fc;
    }
    .ref-box {
      background: linear-gradient(135deg, #1e293b, #020617);
      padding: 20px;
      border-radius: 12px;
      margin: 25px 0;
      text-align: center;
      border: 1px dashed #6366f1;
    }
    .ref-box p {
      margin-bottom: 10px;
      font-size: 14px;
    }
    .ref-link {
      word-break: break-all;
      color: #a5b4fc;
      font-weight: bold;
      font-size: 14px;
    }
    .rewards {
      margin-top: 25px;
    }
    .rewards ul {
      padding-left: 20px;
      color: #d1d5db;
    }
    .rewards li {
      margin-bottom: 10px;
    }
    .footer {
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #9ca3af;
      border-top: 1px solid #1e293b;
      background-color: #020617;
    }
    .footer span {
      color: #a5b4fc;
      font-weight: bold;
    }
  </style>
</head>

<body>
  <div class="container">

    <!-- Header -->
    <div class="header">
      <h1>Welcome to COMPOSIT 🎉</h1>
      <p>Student Ambassador Program 2026</p>
    </div>

    <!-- Content -->
    <div class="content">
      <h2>Hello ${name} 🚀</h2>

      <p>
        Congratulations! You are now an official <strong>Student Ambassador</strong> for 
        <strong>COMPOSIT 2026</strong>.  
        We’re thrilled to have you represent COMPOSIT and lead the way in building a 
        nationwide student community.
      </p>

      <div class="info-box">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Student Ambassador ID:</strong> ${saId}</p>
      </div>

      <p>
        Your journey begins now. Start referring participants and climb your way up the
        <strong>nationwide leaderboard</strong>. The more you share, the higher your rank!
      </p>

      <div class="ref-box">
        <p>🔗 <strong>Your Unique Referral Link</strong></p>
        <div class="ref-link">${referralLink}</div>
        <p style="margin-top: 12px;">
          Share this link everywhere — WhatsApp, Instagram, LinkedIn, and college groups.
        </p>
      </div>

      <p>
        You can find your referral link and QR code in your dashboard.  
        Every successful registration through your link pushes you closer to the top.
      </p>

      <div class="rewards">
        <h2>🏆 Top Ambassador Benefits</h2>
        <ul>
          <li>🌍 Rank on the <strong>nationwide leaderboard</strong></li>
          <li>🏨 Chance to win <strong>FREE accommodation</strong></li>
          <li>🎁 Exclusive <strong>COMPOSIT goodies & merchandise</strong></li>
          <li>📜 Certificates, recognition & special mentions</li>
        </ul>
      </div>

      <p>
        Stay consistent, keep sharing, and secure your position among the 
        <strong>top Student Ambassadors in the nation</strong>.
      </p>

      <p>
        Best regards,<br />
        <strong>Team COMPOSIT</strong>
      </p>
    </div>

    <!-- Footer -->
    <div class="footer">
      © 2026 <span>COMPOSIT</span> • All Rights Reserved<br />
      You are receiving this email as an official Student Ambassador.
    </div>

  </div>
</body>
</html>
`,
  });
}
