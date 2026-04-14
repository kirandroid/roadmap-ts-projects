import { eq } from "drizzle-orm";
import { drizzleDBClient } from "../..";
import { urlsTable } from "../db/schema";
import type { Url } from "../types/url";

export const shortenUrl = async (
  _req: Request,
  _user: any,
  validatedData: Url,
): Promise<Response> => {
  const shortedURL = await drizzleDBClient
    .insert(urlsTable)
    .values({
      url: validatedData.url,
      shortCode: "sfehwguljfkn",
    })
    .returning();
  return Response.json(
    {
      status: "success",
      data: shortedURL,
    },
    { status: 201 },
  );
};

export const redirectShortenUrl = async (
  _req: Request,
  _server: any,
  ctx: any,
): Promise<Response> => {
  const { url } = ctx.params;
  const urlData = await drizzleDBClient
    .select()
    .from(urlsTable)
    .where(eq(urlsTable.shortCode, url));

  if (urlData.length == 0) {
    return Response.json({ status: "not found" }, { status: 400 });
  }

  await drizzleDBClient
    .update(urlsTable)
    .set({
      accessCount: (urlData[0]?.accessCount ?? 0) + 1,
    })
    .where(eq(urlsTable.shortCode, url));

  return Response.redirect(urlData[0]?.url ?? "");
};
