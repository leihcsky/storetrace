import { NextResponse } from "next/server";
import { z } from "zod";
import { scanStore } from "@/lib/shopify/scan-store";
import { saveScanResult } from "@/lib/db/repositories/store-repository";
import { domainToSlug } from "@/lib/utils/url";

const scanSchema = z.object({
  url: z.string().min(1, "Store URL is required"),
  save: z.boolean().optional().default(true),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = scanSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const result = await scanStore(parsed.data.url);

    if (!result.shopifyDetected) {
      return NextResponse.json(
        {
          error: "This does not appear to be a Shopify store.",
          result,
        },
        { status: 422 }
      );
    }

    let domainSlug = domainToSlug(result.domain);

    if (parsed.data.save && process.env.DATABASE_URL) {
      try {
        const saved = await saveScanResult(result);
        domainSlug = saved.domainSlug;
      } catch (dbError) {
        console.error("Failed to save scan result:", dbError);
      }
    }

    return NextResponse.json({
      result,
      redirectTo: `/stores/${domainSlug}`,
    });
  } catch (error) {
    console.error("Scan failed:", error);
    const message =
      error instanceof Error ? error.message : "Failed to analyze store";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
