import { auth } from "@clerk/nextjs/server";
import { put } from "@vercel/blob";
import { NextResponse, type NextRequest } from "next/server";
import { ulid } from "ulid";

export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    const blob = await put(ulid() + "-" + new Date().toLocaleDateString("sv-SE").replaceAll("-", ""), file, {
      access: "public",
      allowOverwrite: true,
    });
    return NextResponse.json({ url: blob.url }, { status: 200 });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
