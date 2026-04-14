CREATE TABLE "urls" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "urls_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"url" text NOT NULL,
	"shortCode" text NOT NULL,
	"accessCount" integer DEFAULT 0 NOT NULL,
	"updatedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "urls_shortCode_unique" UNIQUE("shortCode")
);
