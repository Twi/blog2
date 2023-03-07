---
title: "Blog: The Second"
desc: What I learned about friendship, I mean Hakyll
date: 2023-03-06
image: /images/apple-acres.jpg
---

So you may have noticed that my blog looks different. This isn't a
mistake, I have totally rewritten the backend on top of
[Fresh](https://fresh.deno.dev), a framework for doing dynamic web
shit with [Deno](https://deno.land).

Historically, JavaScript stuff and I have gone together like oil and
water. NPM fights me. A lot. I have to hack and hack to get beyond a
basic proof of concept. It's frankly exhausting. I have not had to
fight Deno at all. Everything just works like you'd expect it to in
other ecosystems. It's a thing of beauty.

One of the biggest advantages of this setup is that I now have cut out
the slowest part of deploying my site: waiting for GitHub Actions to
build all of the Haskell code involved with the [old
stack](https://github.com/Twi/blog/tree/main/ssg). A full deploy of
the old blog took up to _15 minutes_ to have a moderately complicated
Haskell program barf out about a megabyte of static HTML. This _does
work_, but it's very inelegant.

The old static site also was awkward to style. I had a [simple CSS
file](https://github.com/Twi/blog/blob/main/src/css/default.css) based
on [100 Bytes of CSS to look great
everywhere](https://www.swyx.io/css-100-bytes), but I'm very bad at
styling websites, so this didn't really scale for me. The new blog
uses [twind](https://twind.style/), which allows me to use all the
goodness of [tailwind](https://tailwindcss.com/). I'm still figuring
out how to style this, but I'm happy with what I have so far.

I'm gonna try out this new blog engine a bit. It's pretty nice and
minimal, but so far I've noticed that I don't have RSS feed support
yet. I'll get there though, probably will just have a JSONFeed this
time around.

I hope I can continue with this. It's pretty cozy and nice.
