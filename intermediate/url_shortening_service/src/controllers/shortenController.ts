import { eq } from "drizzle-orm";
import { drizzleDBClient } from "../..";
import { urlsTable } from "../db/schema";
import type { UpdateUrlBody, UrlParams } from "../types/url";

export const shortenUrl = async (
  _req: Request,
  _user: any,
  ctx: { body: UpdateUrlBody },
): Promise<Response> => {
  const { targetUrl } = ctx.body;

  const shortedURL = await drizzleDBClient
    .insert(urlsTable)
    .values({
      url: targetUrl,
      shortCode: "cskj",
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
  ctx: { params: UrlParams },
): Promise<Response> => {
  const { slug } = ctx.params;
  const urlData = await drizzleDBClient
    .select()
    .from(urlsTable)
    .where(eq(urlsTable.shortCode, slug));

  if (urlData.length == 0) {
    return Response.json({ status: "not found" }, { status: 400 });
  }

  await drizzleDBClient
    .update(urlsTable)
    .set({
      accessCount: (urlData[0]?.accessCount ?? 0) + 1,
    })
    .where(eq(urlsTable.shortCode, slug));

  return Response.redirect(urlData[0]?.url ?? "");
};

export const getShortenUrl = async (
  _req: Request,
  _user: any,
  ctx: { params: UrlParams },
): Promise<Response> => {
  const { slug } = ctx.params;
  const urlData = await drizzleDBClient
    .select({
      id: urlsTable.id,
      url: urlsTable.url,
      shortCode: urlsTable.shortCode,
      createdAt: urlsTable.createdAt,
      updatedAt: urlsTable.updatedAt,
    })
    .from(urlsTable)
    .where(eq(urlsTable.shortCode, slug));
  return Response.json(
    {
      status: "success",
      data: urlData,
    },
    { status: 200 },
  );
};

export const updateShortenData = async (
  _req: Request,
  _server: any,
  ctx: { params: UrlParams; body: UpdateUrlBody },
): Promise<Response> => {
  console.log(ctx);
  const { slug } = ctx.params;
  const { targetUrl } = ctx.body;

  const shortedURL = await drizzleDBClient
    .update(urlsTable)
    .set({
      url: targetUrl,
    })
    .where(eq(urlsTable.shortCode, slug))
    .returning();
  return Response.json(
    {
      status: "success",
      data: shortedURL,
    },
    { status: 201 },
  );
};

export const deleteShortenUrl = async (
  _req: Request,
  _user: any,
  ctx: { params: UrlParams },
): Promise<Response> => {
  const { slug } = ctx.params;
  await drizzleDBClient.delete(urlsTable).where(eq(urlsTable.shortCode, slug));
  return Response.json(
    {
      status: "success",
    },
    { status: 200 },
  );
};

export const getShortenUrlStats = async (
  _req: Request,
  _user: any,
  ctx: { params: UrlParams },
): Promise<Response> => {
  const { slug } = ctx.params;
  const urlData = await drizzleDBClient
    .select({
      id: urlsTable.id,
      url: urlsTable.url,
      shortCode: urlsTable.shortCode,
      accessCount: urlsTable.accessCount,
      createdAt: urlsTable.createdAt,
      updatedAt: urlsTable.updatedAt,
    })
    .from(urlsTable)
    .where(eq(urlsTable.shortCode, slug));
  return Response.json(
    {
      status: "success",
      data: urlData,
    },
    { status: 200 },
  );
};
