import { NextResponse } from "next/server";
// import { pinata } from "@/utils/pinata/config";

// export async function POST(request: NextRequest) {
//   try {
//     const data = await request.formData();
//     const file: File | null = data.get("file") as unknown as File;
//     const uploadData = await pinata.upload.file(file);
//     const url = await pinata.gateways.createSignedURL({
//       cid: uploadData.cid,
//       expires: 3600,
//     });
//     return NextResponse.json({
//       url,
//       cid: uploadData.cid,
//     });
//   } catch (e) {
//     console.log(e);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import { put } from "@vercel/blob";

export async function POST(request: Request): Promise<NextResponse> {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  // ⚠️ The below code is for App Router Route Handlers only
  const blob = await put(file.name, file, {
    access: "public",
  });

  // Here's the code for Pages API Routes:
  // const blob = await put(filename, request, {
  //   access: 'public',
  // });

  return NextResponse.json(blob);
}
