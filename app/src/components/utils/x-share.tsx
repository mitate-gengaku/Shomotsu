import { ComponentProps, forwardRef } from "react";

type TwitterIntentTweetProps = {
  text?: string;
  url?: string;
  hashtags?: string[];
  via?: string;
  related?: string[];
  in_reply_to?: string;
} & Omit<ComponentProps<"a">, "href" | "target" | "rel">;

export const XShare = forwardRef<HTMLAnchorElement, TwitterIntentTweetProps>(
  ({ text, url, hashtags, via, related, in_reply_to, ...props }, ref) => {
    const _url = new URL("https://x.com/intent/tweet");

    if (text) _url.searchParams.set("text", text + "\n");
    if (url) _url.searchParams.set("url", url);
    if (hashtags) _url.searchParams.set("hashtags", hashtags.join(" "));
    if (via) _url.searchParams.set("via", via);
    if (related) _url.searchParams.set("related", related.join(","));
    if (in_reply_to) _url.searchParams.set("in_reply_to", in_reply_to);

    return (
      <a
        ref={ref}
        href={_url?.toString()}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="twitter-share"
        {...props}
      />
    );
  },
);

XShare.displayName = "XShare";
