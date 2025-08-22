import { NextResponse } from "next/server";

const UPSTREAM_URL = "https://api.zextons.co.uk/get/category/for/navbar";
const TIMEOUT_MS = 7000;

export async function GET() {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(UPSTREAM_URL, {
      // Allow ISR-like caching for server-rendered usage if needed
      next: { revalidate: 300 },
      // Forward minimal headers; customize if upstream needs more
      headers: {
        Accept: "application/json",
      },
      signal: controller.signal,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return NextResponse.json(
        { message: "Upstream error", status: res.status, body: text },
        { status: 502 }
      );
    }

    const data = await res.json();
    // Ensure shape matches client expectation: { data: [...] }
    return NextResponse.json({ data: data?.data ?? data }, {
      // Cache for browsers/CDN; tweak as desired
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=300",
      },
    });
  } catch (err: any) {
    const message = err?.name === "AbortError" ? "Request timed out" : err?.message || "Unknown error";
    return NextResponse.json({ message }, { status: 504 });
  } finally {
    clearTimeout(id);
  }
}
