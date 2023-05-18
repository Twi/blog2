---
title: "People want products, not projects"
desc: "Or: why platforms win out over protocols"
date: 2023-05-17
image: /images/iphone-monolith.jpg
---

There's a large feeling in my industry that the internet is getting
more and more monotonous. Hand-crafted works of [internet
whimsy](https://jackomix.neocities.org/) have faded towards the same
drab design that everyone uses. It becomes merely populated with
people's information rather than people truly customizing it. As
things get more complicated and scale to more users, options for
individuality and creativity get snuffed away in the names of
consistency, security, and so that the people making those platforms
don't have to test as many invariants.

This is understandable, but it sucks, but it's understandable.

There's been a call towards moving people away from products like
Twitter in favor of projects like Mastodon, but I feel that these
fundamentally miss the point of why people use products in the first
place. This fundamental misunderstanding leads some projects to be
seen in the same vein as products, but ultimately make things fail to
land with people.

## Products and Projects

These two words are things that _feel_ like they should be identical,
but they are acutally very fundamentally different. I'm also a
software person by trade, so please understand everything here as
talking about the software industry.

A project is something that is created by a group of people that aims
to solve a goal they face and then stops there. Typically the results
of projects are for solving individual goals or the needs of smaller
groups of people.

A good example of a project is Mastodon. Mastodon is a project that
gives you most of what people like about using Twitter without having
to actually use Twitter. You can post things, repost things other
people said, reply to things people have posted, and view feeds of
other random things other people have posted. This gets you most of
the same experience as using Twitter, but without the downsides of
actually using Twitter (lax moderation due to the sheer scale, etc.).

In contrast, a product is something that you can get "off the shelf".
A lot of the options have been pared down or sanded away so that
things just work. There's a core philosophy at work there powered by a
team that spends a lot of time figuring out what the best way for them
to do the thing is.

This is different from a project because a product can be adopted
without many additional steps like setting up infrastructure,
purchasing a domain name, or knowing what an Ubuntu is. Think about
the number of companies that managed to get internet presence when the
complexity was reduced from "pay a bunch of money to find this weird
nerd to set this up for us" to "open facebook.com, make a page, share
the page". You don't have to know what HTML, TLS, Apache, or anything
is to make a page on Facebook.

One way you can conceptualize this is that a project needs work to fit
into your needs, while a product can easily be adopted without any
work at all being required. Running a Mastodon server for a community
is a project, but Twitter as a product is there and you can create an
account in less than an hour. Unless you really know what you are
doing, it's inconceiveable that some random person could really figure
out all the technology and maintenance schedules needed to set up a
Mastodon server.

Similarly, choosing a homeserver to use is a problem that Mastodon has
that Twitter never will. This is core to the Mastodon project, but
never will be relevant to the Twitter product.

Fun fact: this is the same basic friction as the "protocols vs
platforms" schtick that people were on about a while ago. Protocols
require work to adapt them to existing molds. Platforms and products
that let you build things on top of them. Compare IRC and Discord.
IRC is a protocol that's been around about as long as I've been alive,
and it's historically been used by open source projects all across the
world to coordinate projects that quite literally keep a large amount
of society together. However the protocol has stagnated and every
attempt to modernize it fails because some random person doesn't want
things to change. Meanwhile Discord as a platform is able to onboard
more users per month than many IRC networks ever had at their peak
user count.

I can't reply to a Linux Kernel Mailing List thread from my iPhone but
I sure as hell can comment on a GitHub thread from the same device!

## Why can't they just take up a project?

Some of you in the audience are probably thinking "wow but why can't
those people just learn how to set up an email server instead of
paying Google? It's not a problem for me. I have many rare funko
pops." People use products because projects require work. They require
you to have a vision. They need you do consider a design. They take
actual real work in ways that I expect that many people don't have
available because life is fucking excruciating. The last few years
have burnt people out to a crisp. Being able to enter in the name of
the business, the address, some photos of the restaurant and open
hours is _so much easier_ than having to have any of the opinions
needed to set up a website that it's not even funny.

Communities don't want to maintain infrastructure, they want to talk
about their speedrunning misadventures.

People don't want to have to know what an instance or a homeserver is,
they just want to talk to people.

Nobody really wants to set up a bouncer to stay in their chatrooms for
them, they just want to scroll up and see what other people said.

And finally, why should you have to set up a server, learn what Docker
is, understand what a postgres is, and all of the errata with DNS,
Let's Encrypt, or uptime is when you can outsource that to Twitter.

I guess the real consequence of relying on these commercial platforms
is that the floor can and will fall out from under you in a moment's
notice. Skype went to shit without much warning. Twitter did too.
Discord will next. It's not a matter of if, but when with these
products.

## Edge cases

Of course, because I set rules in this article, there are exceptions.
These exceptions can get kinda hairy, and both of them really push the
lines between product and project.

### Bluesky

Bluesky is the main company behind the [AT
Protocol](https://atproto.com), a protocol designed to give people the
same experience of using Twitter while allowing for people to migrate
their data and identity between homeservers at will. The exact
federation UX hasn't totally been nailed down yet, but the basic model
is that people have domain names as their usernames. I'm
[@friendshipcastle.zip](https://staging.bsky.app/profile/friendshipcastle.zip)
thanks to [this JSON
route](https://friendshipcastle.zip/xrpc/com.atproto.identity.resolveHandle)
(powered by [this
code](https://github.com/Twi/blog2/blob/main/routes/xrpc/com.atproto.identity.resolveHandle.ts)).
You can use DNS though.

The real weird part about Bluesky is that unlike Mastodon and the
fediverse at large is that their federation support is not implemented
and deployed yet. They also have some [questionable
views](https://blueskyweb.xyz/blog/4-13-2023-moderation) on how
moderation should work which is very obviously well-intentioned but
definitely not from the perspective of someone who has suffered at the
hands of organized harassment.

People are using it and treating it like "the new Twitter". There is
also a culture there that seems to be treating it like it is a
centralized service and not understanding that everything they post
there is public. Very public. Extremely public. It's easy to
understand why people think that it's private though. Here's a link to
one of my skeets (yes, people really do use slang for ejaculation as
the term for posting to Bluesky):
[staging.bsky.app/profile/friendshipcastle.zip/post/3jvu2krd6am2j](https://staging.bsky.app/profile/friendshipcastle.zip/post/3jvu2krd6am2j).
If you have a Bluesky account, you'll be able to see it. If you don't,
you can't. This confusion happens because their main app is
invite-only, but the undelying protocol makes things public _by
design_. You can change the `staging.bsky.app` domain to `psky.app`
and then you can instantly see every skeet (god I hate that term, I'm
going to use "post" for the rest of this article) with `curl`:

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Twi (@friendshipcastle.zip) " />
<meta name="twitter:image" content="None" />
<meta name="twitter:creator" content="@Twi" />
<meta property="og:description" content="What's up gamers?" />
```

They're public even if the website doesn't show them as public. I
can't blame users for treating it like a platform and assuming people
can't read their posts without an account because that's how every
invite-only platform works. I guess it's a protocol and a product, but
that's a weird class of thing that we haven't really seen before this.

God knows what the fallout is going to be when Bluesky enables
federation and right-wing assholes make their own homeserver and use
that to bypass earned bans. All of the Bluesky's mantra of "you don't
need to block homeservers" doesn't bode well from an ActivityPub
perspective of domain bans being the only real scalable solution.

Maybe their "bring your own algorithm" idea will help, maybe it won't.
Only time will tell, but I'm not holding my breath.

### Mastodon

Yeah, know how I mentioned Mastodon as a project earlier in the
article? They're trying to become a product. One of the ways they are
trying to do this is by [making mastodon.social the default homeserver
when you set up the
app](https://techcrunch.com/2023/05/02/mastodon-now-has-a-simpler-sign-up-process/).
Again, can't blame them there. The most common bit of end-user
feedback is that they don't know what a server is. Again,
understandable. Individual servers being relevant is a protocol thing,
and many users come from the perspective of using products.

That and "if I can move my account why can't I move my posts" that is.
Both are incredibly valid questions and they really do need a good
answer if the project wants to really graduate into a full-fledged
product.

There's another bit about product development that I haven't really
touched upon until now: products have a _core philosophy_ to them.
They are really a set of ideas that guide people building all of the
projects that build up to the product. These things surface in the
projects, but at some level they are a completely different thing.

I don't know if Mastodon can really become a product because of how
diverse the community is. There's not really one common tie that binds
everyone together, there are a lot of smaller communities that all
interoperate.

In terms of mastodon.social, that may be able to become a product with
one of the projects powering it being the Mastodon codebase, but
Mastodon itself probably is never going to be a product.

At least in the fediverse nazi punks get blocked quickly and people
crowdsource warning other instances about them. From empirical
evidence, it's taken several days of consecutive outrage on Bluesky to
get notable transphobes banned.

Every community being its own fiefdom really does make a lot more
sense in the long run because that's just fundamentally how people
gather into groups.

## The path forward

I think the real solution to the protocol vs project problem is
ultimately going to come down to communities banding together to
create services to meet the needs of their members. Communities are
what really drive society forward, not individuals.

Many people take this product vs project dichotomy to be made better
by "personal responsibility" or something along that line, but
honestly I think that having things like social media platforms being
run by communities is a _fundamental strength_, not a weakness.
Content moderation and server administration are fundamentally
separate actions and things benefit from separate people having those
responsibilities. The main problem is that a lot of these skills that
were essential to early internet communities are locked away and
relegated to experts that are paid too much to want to do this shit on
their offtime. Can't blame them.

My therapist has told me that I really shouldn't be so
conspiratorial-minded but goddamn this entire thing looks like there
is some kind of conspiracy to make building communities harder and
harder. Many online communities today barely resemble the communities
that our parents and grandparents grew up with. Everything is so
alienating and small.

This entire situation sucks and I don't know what to do about it. One
of the main reasons I made my blog on my own domain hosted via
[fly.io](https://fly.io) is because I wanted to see how hard it would
be to use [Fresh](https://fresh.deno.dev/) to [remake my blog in my
image](https://friendshipcastle.zip/blog/blog2). Turns out it wasn't
hard for me, but I'm an expert in backend software development and I
have opinions about this shit.

I really wish I had answers here. I don't. However I think it's
important for us all to really realize that projects and products are
vastly different things. More than likely, you work on a product at
your dayjob and work on projects on your offtime.
