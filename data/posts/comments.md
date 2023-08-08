---
title: "There's comments now"
date: 2023-08-08
summary: "I made a huge mistake and added comments to this blog engine."
---

As the title says, I've added comments to my blog engine. In order to
comment on articles, you need to sign in with GitHub at
[/auth/signin](/auth/signin). I reserve the right to delete any
comments without warning or notice.

This works by putting everything into [Deno
KV](https://deno.land/manual@v1.36.0/runtime/kv) and relying on the
lexicographically sortable properties of
[ULID](https://github.com/ulid/spec) values. When you make a comment
on an article, it inserts a value in the database and then re-renders
the comments section. You can use Markdown in comments (formatted with
[Comrak](https://github.com/kivikakk/comrak)).

I hope this works for you!
