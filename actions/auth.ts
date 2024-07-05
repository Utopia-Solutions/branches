"use server";

import { SignInSchema } from "@/types";
import db from "@/lib/db";
import { magicLinkTable, userTable } from "@/lib/db/schema.ts";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { z } from "zod";
import { generateMagicLink, sendMagicLinkEmail } from "./magic-link.ts";
import { lucia, validateSession } from "@/lib/auth";
import { cookies } from "next/headers";

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

      await sendMagicLinkEmail(values.email, response.data.url);
    } else {
      // TODO: DO NOT generate a new user, return an error instead
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
      await sendMagicLinkEmail(values.email, response.data.url);
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
    const { session } = await validateSession();
    if (!session) {
      return { success: false, error: "Unauthorized" };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return { success: true };
  } catch (error: any) {
    console.error("signOut Error:", error);
    return {
      success: false,
      error: error.message || "An unknown error occurred",
    };
  }
};
