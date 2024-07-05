"use server";
import db from "@/db";
import { magicLinkTable, userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { SignInSchema } from "@/types";
import { lucia, validateRequest } from "@/auth";
import { cookies } from "next/headers";

const sendEmail = async (email: string, url: string) => {
  // send email logic
  console.log(`Email sent to ${email} with the link: ${url}`);
};

const generateMagicLink = async (email: string, userId: string) => {
  const token = jwt.sign({ email: email, userId }, process.env.JWT_SECRET!, {
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

export const signIn = async (values: z.infer<typeof SignInSchema>) => {
  try {
    SignInSchema.parse(values);

    const existingUser = await db.query.userTable.findFirst({
      where: eq(userTable.email, values.email),
    });

    if (existingUser) {
      const response = await generateMagicLink(values.email, existingUser.id);

      await db.insert(magicLinkTable).values({
        userId: existingUser.id,
        token: response.data.token,
      });

      await sendEmail(values.email, response.data.url);
    } else {
      // we will create the user
      const userId = generateId(15);
      await db.insert(userTable).values({
        email: values.email,
        id: userId,
      });
      const response = await generateMagicLink(values.email, userId);
      response;
      await db.insert(magicLinkTable).values({
        userId,
        token: response.data.token,
      });
      await sendEmail(values.email, response.data.url);
    }

    return {
      success: true,
      message: "Magic link sent successfully",
      data: null,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message,
      data: null,
    };
  }
};

export const signOut = async () => {
  try {
    const { session } = await validateRequest();

    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
};
