"use server";

import jwt from "jsonwebtoken";
import { sendEmail } from "./email";

export const sendMagicLinkEmail = async (
  recipientEmail: string,
  url: string
) => {
  const subject = "Sign in to your Branches account";
  const html = `
    <div style="font-family: Roboto, sans-serif; line-height: 1.5; color: #333;">
      <p>Click the button below to sign in to your Branches account:</p>
      <p>
        <a href="${url}" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #80AB37; color: white; text-decoration: none; font-weight: bold; border-radius: 5px;">Sign in</a>
      </p>
      <p style="margin-top: 20px; font-size: 0.9em; color: #777;">
        If you did not request this email, please ignore it or contact support if you have any concerns.
      </p>
      <p style="margin-top: 40px; font-size: 0.8em; color: #aaa;">
        This email was sent by Branches. © ${new Date().getFullYear()} Branches, Inc. All rights reserved.
      </p>
    </div>
  `;
  try {
    await sendEmail(recipientEmail, subject, html);
  } catch (error) {
    return {
      success: false,
      message: (error as any)?.message,
      data: null,
    };
  }
};

export const generateMagicLink = async (email: string, userId: string) => {
  const token = jwt.sign({ email, userId }, process.env.JWT_SECRET!, {
    expiresIn: "5m",
  });

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/magic-link?token=${token}`;

  return {
    success: true,
    message: "Magic link generated successfully",
    data: {
      token,
      url,
    },
  };
};
