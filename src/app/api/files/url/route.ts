import { NextRequest, NextResponse } from "next/server";
import { pinata } from "@/utils/pinata/config";

export async function POST(request: NextRequest) {
  const { cid } = await request.json();

  if (!cid) {
    return NextResponse.json({ error: "Missing CID" }, { status: 400 });
  }

  const url = await pinata.gateways.createSignedURL({
    cid: cid,
    expires: 60000,
  });

  return NextResponse.json({ url });
}
