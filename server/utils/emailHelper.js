const nodemailer = require("nodemailer");
const fs = require("fs");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

function replaceContent(content, creds) {
  let allKeysArr = Object.keys(creds);

  allKeysArr.forEach(function (key) {
    content = content.replace(`#{${key}}`, creds[key]);
  });
  return content;
}

async function EmailHelper(templateName, receiverEmail, creds) {
  try {
    const templatePath = path.join(__dirname, "email_templates", templateName);
    let content = await fs.promises.readFile(templatePath, "utf-8");

    let subject = "";
    let text = "";

    if (templateName === "otp.html") {
      subject = "Reset Password OTP";
      text = `Hi ${creds.name}, this is your reset OTP: ${creds.otp}`;
    } else if (templateName === "ticketTemplate.html") {
      subject = "Your Movie Tickets are Booked";
      text = `Hi ${creds.name}, your booking for "${creds.movie}" at ${creds.theater} on ${creds.date} at ${creds.time} is confirmed. You have booked ${creds.seats.length} seat(s). Total amount: $${creds.amount}. Transaction ID: ${creds.transactionid}`;
    } else {
      subject = "Notification from Our Service";
      text = `Hi ${creds.name}, this is a system notification.`;
    }

    const emailDetails = {
      to: receiverEmail,
      from: process.env.GMAIL_USER,
      subject: subject,
      text: text,
      html: replaceContent(content, creds),
    };

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail(emailDetails);
    console.log("Email sent successfully");
  } catch (err) {
    console.log("Error sending email: ", err);
  }
}

module.exports = EmailHelper;
