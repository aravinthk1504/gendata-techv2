import { NextResponse } from "next/server";
import { currentAdmin } from "../../../../../lib/admin-auth";

export const runtime = "nodejs";

export async function GET(request) {
  if (!await currentAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  const key = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;
  if (!cloud || !key || !secret || !/^[a-zA-Z0-9_-]+$/.test(cloud)) {
    return NextResponse.json({ error: "Cloudinary is not configured" }, { status: 503 });
  }

  // Cloudinary uses asset_folder in dynamic mode and folder in legacy fixed mode.
  // The query is server-owned; clients cannot search outside the GenData Tech folder.
  const cursor = new URL(request.url).searchParams.get("cursor") || "";
  if (cursor.length > 512 || !/^[A-Za-z0-9+/_=-]*$/.test(cursor)) {
    return NextResponse.json({ error: "Invalid paging cursor" }, { status: 400 });
  }
  try {
    const token = Buffer.from(key + ":" + secret).toString("base64");
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/" + cloud + "/resources/search",
      {
        method: "POST",
        headers: {
          Authorization: "Basic " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expression: "(asset_folder:gendata-tech/* OR folder:gendata-tech/*) AND resource_type:image",
          sort_by: [{ created_at: "desc" }],
          max_results: 48,
          ...(cursor ? { next_cursor: cursor } : {}),
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(15000),
      }
    );
    if (!response.ok) {
      console.error("Cloudinary library request failed", response.status);
      return NextResponse.json({
        error: response.status === 429 ?
          "Cloudinary library request limit reached. Try again later." :
          "Unable to retrieve Cloudinary images. Check API permissions and folder access.",
      }, { status: 502 });
    }
    const data = await response.json();
    const items = (Array.isArray(data.resources) ? data.resources : [])
      .filter(image => image.secure_url?.startsWith("https://res.cloudinary.com/"))
      .map(image => ({
        assetId: image.asset_id,
        publicId: image.public_id,
        url: image.secure_url,
        name: image.display_name || image.public_id?.split("/").at(-1) || "Image",
        width: image.width || 0,
        height: image.height || 0,
        createdAt: image.created_at || null,
      }));
    return NextResponse.json({ items, nextCursor: data.next_cursor || null }, {
      headers: { "Cache-Control": "private, no-store" },
    });
  } catch (error) {
    console.error("Cloudinary library unavailable", error?.name || "unknown");
    return NextResponse.json({ error: "Unable to load media library" }, { status: 502 });
  }
}
