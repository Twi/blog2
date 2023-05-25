---
title: Adding Bluesky custom domain support to a Fresh app
date: 2023-05-25
summary: Basically create a file and then dump these contents in it.
image: /images/coffee-girl.jpg
---

If you've been a web developer, you probably know about the
[`.well-known`](https://datatracker.ietf.org/doc/html/rfc8615)
standard, it's where you store things like:

- ACME challege information if you are using the HTTP challenge for
  Let's Encrypt
- Apple Pay metadata
- Social network node information
- WebFinger responses for Mastodon user discovery
- Metadata for enrolment in Apple's mobile device management software

However, when you set up a custom username / domain name in
[Bluesky](https://blueskyweb.xyz/), you're supposed to set up a DNS
TXT record pointing to your userid. But they do support fetching this
information over HTTPS.

When I found about about this initially, I thought it would go in
`/.well-known/atproto` or something to match the DNS record
`_atproto.friendshipcastle.zip`. This would also prevent abuse and
make it easier for operators of shared domains to prevent people from
using their identity in social media, which could end in one of a
thousand very bad things.

Nope.

Turns out you're supposed to put it in this very memorable path:
`/xrpc/com.atproto.identity.resolveHandle`, and then you return a JSON
document that looks like this:

```json
{
    "did":"did:plc:g2ag3sguurbal7k6irnujf64"
}
```

This is how [this guy became S3, all of
S3](https://chaos.social/@jonty/110307532009155432). That seems
totally brand-friendly.

When I implemented Bluesky support for my new domain
friendshipcastle.zip, I decided to do it over HTTPS for logistical
reasons involving spacebar heating and my DNS setup being complicated.

Here's how you do it with [Fresh](https://fresh.deno.dev/):

Create a file called
`routes/xrpc/com.atproto.identity.resolveHandle.ts` and copy these
contents into it:

```typescript
import { HandlerContext } from "$fresh/server.ts";

const myDID = "did:plc:g2ag3sguurbal7k6irnujf64";

export const handler = async (
  req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  return new Response(JSON.stringify({ did: myDID }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
```

Then deploy your app to production and follow the ["change my
handle"](https://davidwalsh.name/bluesky-use-domain) workflow so you
can use your domain in the hellthread all you want. You can be
`bulge-noticer.phd` or whatever your twisted heart desires.

If you want, you can follow me at
[@friendshipcastle.zip](https://staging.bsky.app/profile/friendshipcastle.zip).
I post irregularly there and I'm still trying to figure out my
relationship with social media.
