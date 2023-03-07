---
title: Making Go telemetry opt-in is a mistake
desc: A hot take.
date: 2023-02-25
image: /images/librarian.jpg
---

EDIT: Hi hacker news! A lot of this article is written under the premise of "if
this thing that I am not sure about has to exist, opt-out is the best way to get
actionable data". Thank you.

On Feburary 8, 2023, Russ Cox (the technical lead for the Go programming
language, aka rsc) published a series of posts about
[Transparent Telemetry for Open-Source
Projects](https://research.swtch.com/telemetry). This outlined a process and
methodology for the Go team to figure out _what people using Go actually do with
the language_ in a way that:

- Does not collect private information (usernames, source code, package names).
- Allows them to figure out what people do with Go in the wild _without having
  to ask them_ (this is more representative of how people _actually use the
  tool_ rather than what they will claim when asked).
- Easily lets anyone investigate what data is being collected.
- Is easy to opt-out of at a user _and OS package distributor level_.

And, most importantly:

- Allows researchers access to the data that is collected on a daily basis so
  they can do whatever analysis they want.

In terms of how these systems are usually implemented, this is a _breath of
fresh air_ and gives people _a lot of transparency_ that is unparallelled to how
this is usually implemented in the industry at large.

Unfortunately, the proposal came from a Google employee. Google has a reputation
of taking user data and feeding it into piles of linear algebra in order to skew
its search results to match your existing biases or whatever the hell else
people do with linear algebra. The internet was not amused by this proposal. A
shitstorm unlike any other seen in recent memory ensued. The backlash was
immense, with many making empty threats to switch to Rust or something over the
entire situation.

At some point, the backlash got to be too severe and
[rsc announced things were going opt-in](https://research.swtch.com/telemetry-opt-in)
on Feburary 24, 2023. I think that this is a mistake and will make the data
collected by this telemetry system functionally useless. This will end up having
the effect that it is a waste of time for them to implement this system at all,
which will make the situation _worse off for everyone involved_.

## My biases

Before I come across as being some kind of paid Google shill, I want to start
out by stating what I believe my biases _actually are_ going into this:

- I have not ever worked for Google, nor do I plan to. The company is too big
  for me to want to work there.
- I use Go professionally and work for a company that uses Go in some fashion.
  This should go without saying, but anything I say in this blog is not
  representative of my employer, it is my own creation and this article was not
  approved by anyone at the company that feeds my crippling addiction to food
  and housing.
- I am a woman, that may have any number of biases in how I communicate.

## The problem of scrying into the unknowable

Now with that out of the way, let's cover the core problem that telemetry
approaches try to solve: How do people use a tool? What features do they use?
How often does the tool work? How often does it fail? What chronic issues are we
missing?

One of the most basic approaches to this is to just ask people how they use a
tool and collect responses. This works to a point, but it does not scale very
well.

> It's a basic truth of the human condition that everybody lies. The only
> variable is about what.

- Dr. House

People lie. People misremember. People construe their use of the tool with an
NDA'd project to itself be NDA'd. The "just ask people lol" approach works at a
very small scale, but not when that tool is used
[to literally help fighter jets function](https://gcn.com/cloud-infrastructure/2020/01/why-the-air-force-put-kubernetes-in-an-f-16/284772/).

At some level, when a tool gets widespread industry adoption, a lot of the ways
that tool is used will never be talked about publicly. For every kilobyte of Go
code available on GitHub, GitLab, and other Git forges, there are unknowable
megabytes of private Go code that will never see the light of day (or maybe they
will if LAPSUS$ decides to make that company a target). As a result:

- You will never know how the industry _actually uses tools that are widely
  adopted_ by asking them.
- You will never know what features of tools are used by the industry by asking
  them.
- You will only find out what things fail if the user both thinks there is a
  problem _and takes the effort/expends social risk to file a bug_.
- You have to acceps that chronic issues fade into the ether of "oh that's just
  how it is" without anyone taking the time to question them.

At some level, the only way to get answers to these kinds of questions is to
have the tool report data about how a tool is used to the maintainers of that
tool. This is a common practice in the industry, I believe that this approach
was first spearheaded by Microsoft when they added error reporting to Windows
XP. That worked by showing a dialog box when a program crashed to submit details
about that crash to Microsoft. The user had to say "yeah sure, send in the
report", and then it beamed it over to Redmond where they did...something with
it.

This kind of data collection has expanded across the industry to the point where
modern Windows installation dialog boxes offer orwellian choices like:

> Can I do thing?
>
> [A little bit] [A lot]

With no real option for "no, fuck no, not at all, go away". This leads to
backlash for taking this approach. This is super understandable. This kind of
pattern matching is something that is baked into mammals deeply, because at some
point some common ancestor invented trauma (and we are all fucked over because
of that).

With all this in mind, the only way to really know how someone uses a tool is to
have the tool snitch on them. If they make the tool report its usage back to the
home base, it raises questions about consent and the ethics of collecting data
from someone that doesn't know what that data is or what it will be used for.

There is a rock and a hard place and reality is just slamming the Go team
between both of them constantly.

## How "transparent telemetry" works

The transparent telemetry proposal is worth a read and when I'm writing this,
I'm assuming that you actually read the proposal before reading this article.
This is likely a mistake, so here's a tl;dr of the proposal:

- Most telemetry approaches stream realtime userdata to analytics tools so that
  data analysts can do something with them. This approach instead focuses on
  having the Go tool occasionally query the Go module proxy for a configuration
  file _that you can inspect_ and then uses that configuration file to collect
  information about future uses of the Go compiler. The Go tool will then report
  this information _some time in the future_ instead of constantly like other
  ecosystems.
- Most telemetry approaches _start recording instantly_ and can only stop when
  the user says "no, thank you". This lets data analysts think they can
  understand the opt-out rate for telemetry (though, even without telemetry
  there are still a few ways that people can figure out what users are doing,
  they are just very annoying and again not representative of how people
  actually use the tool). The Go approach waits _one week_ before even trying to
  activate the telemetry code, under the assumption that that is enough time to
  opt out.
- The collected data goes through many efforts to avoid including personally
  identifiable information, but apparently IP addresses are personally
  identifiable information and in order for data to be transmitted over the
  internet, an IP address is required as the source. This is unavoidable because
  this is HOW THE INTERNET WORKS.
- The collected telemetry data is put up to the public for anyone to analyze to
  their heart's content. Most approaches take all this data, call it a secret
  and then hide it in S3 somewhere where random members of the public can't see.
  It is difficult to overstate how _amazingly different_ it is to see someone
  propose a system where they don't hide away the data from the public.

One of the key examples given for why this system was considered is an incident
where the Go standard library mysteriously had a C dependency on macOS (for
context: Go programs depending on the standard library alone _should not_
require a C compiler):

> For example, during the Go 1.14 release process in early 2020 we made a change
> to the way macOS Go distributions are built, as part of keeping them
> acceptable to Apple’s signing tools. Unfortunately, the way we made the change
> also made all the pre-compiled `.a` files shipped in the distribution appear
> stale to builds. The effect was that the go command rebuilt and cached the
> standard library on first run, which meant that compiling any program using
> package net (which uses cgo) required Xcode to be installed. So Go 1.14 and
> later unintentionally required Xcode to compile even trivial demo Go programs
> like a basic HTTP server.

- [Transparent Telemetry for Open-Source
  Projects](https://research.swtch.com/telemetry-intro)

Developers using macOS are used to just installing Xcode to make the error
messages go away, so they just installed Xcode and assumed it was normal
behavior of the Go _compiler_ to need you to install _compiler tools_ in order
to _compile programs_.

Not to mention people relying on older hardware! Every so often a Go compiler
backend/port gets proposed for removal and that removal shows up in release
notes for release candidates. Then someone pipes up saying "hi, yes we use this
please don't do that" and then the Go team backs off and the old disused port
lingers around for another release cycle.

Without knowing what ports of Go are used, the Go team can't make sure that the
right time is spent on maintaining those ports. They need to know what is being
used in order to know what is being used. Just asking people what targets they
compile Go to doesn't mean that the people using weird targets like `GOARM=5` or
`-buildmode=shared` will say that that is what they use. Telemetry is the only
real way to get this data. Transparent telemetry makes it transparent to all
parties.

This is overall a fantastic system that would allow any other projects to copy
from and also have their own transparent telemetry approaches. If I was working
on a project that would need telemetry, I would consider this approach because
it is _exactly what I would want to do_. You collect only the data you need,
none of the data you don't, and you don't hoard it all away from the public.

## The nerfening of transparent telemetry

Sadly, I don't think that this will be a new industry standard. The backlash to
this approache was _immediate_ and _immense_. It was not seen as "The Go team
wants to make the Go compiler better" like they had hoped. It was seen as
"Google wants to slurp up more information, this time about a compiler you're
forced to use for work". This was met with exasperation and vitriol from all
sides.

Obviously there was enough backlash that
[they are changing the design
from opt-out to opt-in](https://research.swtch.com/telemetry-opt-in). I fear
that this will bias the sample set and ultimately make this design worthless.
When you make this data opt-in, it means the kind of people who would opt-in to
telemetry collection will end up opting in. This will not collect information
about most Go users, it will only collect information about Go users that know
how to run `go env -w GOTELEMETRY=on`. Given past experiences with people
reporting `GOPATH` to be a difficult thing to figure out, I don't have faith
that the opt-in rate will be high enough to make up for the loss of data
quality.

I don't know what to do about this. It's a shit situation all around and I fear
that understandable concerns about privacy are going to make it harder for a
tool that I rely on and helps me survive capitalism to truly improve.

I just hope I don't sound like a Google shill here. This design that someone
working at Google proposed is the best way to do this kind of action. I guess a
lot of the backlash is against the fact that the concept exists at all. I get
it, but at some level leaving people alone doesn't scale. You can't know what
someone is doing unless you see what they are doing.
