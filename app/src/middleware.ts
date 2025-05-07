import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/signin(.*)", "/signup(.*)", "/legal/(.*)", "/api/webhooks/user"]);

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(30, "30 s"),
});

export default async function middleware(req: NextRequest, event: NextFetchEvent) {
  const ip = (req.ip as string) ?? "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json({
      message: "Too Many Requests"
    }, {
      status: 429
    });
  }

  // レート制限をパスした場合、Clerk認証を実行
  return clerkMiddleware(async (auth) => {
    if (!isPublicRoute(req)) {
      await auth.protect();
    }
    return NextResponse.next();
  })(req, event);
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
