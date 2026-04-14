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
