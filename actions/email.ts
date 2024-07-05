"use server";

import nodemailer from "nodemailer";
import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;

// Your OAuth2 credentials
const CLIENT_ID = process.env.GOOGLE_API_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_API_OAUTH_CLIENT_SECRET;
const REDIRECT_URL = "localhost:3001";
const REFRESH_TOKEN = process.env.GOOGLE_API_OAUTH_REFRESH_TOKEN;
const USER_EMAIL = process.env.GOOGLE_API_OAUTH_USER_EMAIL;

export const sendEmail = async (
  recipientEmail: string,
  subject: string,
  text: string
) => {
  const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

  oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN,
  });

  try {
    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: USER_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token || "",
      },
    });

    const mailOptions = {
      from: USER_EMAIL,
      to: recipientEmail,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
