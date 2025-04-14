import { WebhookEvent, clerkClient } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

import { UserType } from "@/lib/db/type";
import { userService } from "@/services";

// POSTリクエスト
export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;
  const client = await clerkClient();

  if (!SIGNING_SECRET) {
    throw new Error("Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local");
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  // `user.created` イベントの処理
  try {
    if (evt.type === "user.created") {
      const { id, first_name, last_name, email_addresses, image_url, created_at, updated_at } = evt.data;
      const email = email_addresses?.[0]?.email_address || "";

      const values: UserType = {
        id,
        username: (first_name + "_" + last_name).toLowerCase(),
        email,
        imageUrl: image_url,
        createdAt: new Date(created_at),
        updatedAt: new Date(updated_at),
      };

      // ユーザーを作成
      await client.users.updateUser(id, {
        ...values,
        privateMetadata: {
          role: "user",
        },
      });
      await userService.create(values);

      return NextResponse.json({ message: "User saved to DB" }, { status: 200 });
    } else if (evt.type === "user.updated") {
      const { id, username, image_url } = evt.data;

      const values = {
        username: username ?? "",
        imageUrl: image_url,
      };

      await userService.update(id, values);

      return NextResponse.json({ message: "User update to DB" }, { status: 200 });
    }

    return NextResponse.json({ message: "Unhandled event" }, { status: 200 });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
