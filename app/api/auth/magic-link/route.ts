import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import db from "@/lib/db";
import { eq } from "drizzle-orm";
import { magicLinkTable } from "@/lib/db/schema";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);

    const searchParams = url.searchParams;

    const token = searchParams.get("token");

    // TODO: redirect to a page that says the token is not set correctly
    if (!token) {
      return Response.json(
        {
          error: "Token is not set correctly in the URL search params",
        },
        {
          status: 400,
        }
      );
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as {
      email: string;
      userId: string;
      expiresIn: string;
    };

    const isTokenExpired = Date.now() >= Number(decodedToken.expiresIn);

    // TODO: redirect to a page that says the token is expired
    if (isTokenExpired) {
      return Response.json(
        {
          error: "Token is expired",
        },
        {
          status: 400,
        }
      );
    }

    const existingToken = await db.query.magicLinkTable.findFirst({
      where: eq(magicLinkTable.userId, decodedToken.userId),
    });

    // TODO: redirect to a page that says the token does not exist
    if (!existingToken) {
      return Response.json(
        {
          error: "Token does not exist",
        },
        {
          status: 400,
        }
      );
    } else {
      await db
        .delete(magicLinkTable)
        .where(eq(magicLinkTable.userId, decodedToken.userId));
    }

    const session = await lucia.createSession(decodedToken.userId, {
      expiresIn: 60 * 60 * 24 * 7,
    });

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return Response.redirect(new URL(process.env.NEXT_PUBLIC_BASE_URL!), 302);
  } catch (e: any) {
    // TODO: redirect to a page that says an error occurred
    return Response.json(
      {
        error: e.message,
      },
      {
        status: 400,
      }
    );
  }
};
