---
title: "How I learned to stop worrying and love userspace networking"
date: 2024-08-28
summary:
image: /images/glaceon.webp
---

I like self-hosting things when I can. I have a little server running [k3s](https://k3s.io/) at home that I run stuff on. I also have a few things in the cloud on [fly.io](https://fly.io) (those cheap L40ses are great btw). I wanted my workloads on k3s to access the AI server on fly, but I didn't want to set up a VPN to my private network because mixing VPNs and Kubernetes is painful. I also didn't want to expose the AI server to the internet because it's not really meant to be public, and every time it gets poked, it costs me money.

Who says you need to do networking in the kernel though? Networking is just a program that takes in bytes and sometimes puts out different bytes. It's usually exposed to programs via the kernel and system calls, but there's nothing stopping you from doing it in userspace. This'd give you all the fun of fucking about with the network but none of those pesky sudo commands or risks of breaking your network stack until you reboot.

So I looked around and found [wireguard-go has support for netstack](golang.zx2c4.com/wireguard/tun/netstack), a userspace TCP/IP stack for Go programs. It's pretty poorly documented, but I figured out I could dial sockets once I loaded it with config and messed around with the "uapi" a bit. I had to bring in an ini parser to load the WireGuard configs, which is probably wrong, but it works enough.

Figuring out how to do that was a huge pain. I had to `strace` the `wg-quick` command and everything it was doing, but eventually I got the wire form of the config and I was able to make HTTP requests. I also found out that the uapi form had to pre-resolve DNS addresses, the hard way, of course.

I got things working and published it on the GitHubs as [`glaceon`](https://github.com/Twi/glaceon). It's a Go program that exposes an HTTP reverse proxy to a given remote host over WireGuard. It's also the most minimal example I can find for how to use wireguard-go from userspace. Maybe how this works is is worth documenting in another post.

I was just spawning them manually on k3s when I was told that [operator-sdk](https://sdk.operatorframework.io/) would let me make [my own operator](https://github.com/Twi/glaceon-operator). This is an opinionated template that makes it easy to program Kubernetes operators based on "best practices". I kinda hate working with the Go in this framework, but at the very least everything is separated out and all the concerns are easily understood.

Once it was working, I was able to do something incredibly cheeky:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: flycast
---
apiVersion: glaceon.friendshipcastle.zip/v1alpha1
kind: MachineProxy
metadata:
  name: twi-ollama
  namespace: flycast
spec:
  org: personal
  region: yyz
  target: http://twi-ollama.flycast
  port: 80
```

This let my apps access my Ollama server via `http://twi-ollama.flycast` in k3s, just like they can on fly.

## Installing

Installing this is easy. First, install the operator:

```sh
kubectl apply -f \
  https://raw.githubusercontent.com/Twi/glaceon-operator/main/config/rendered.yaml
```

Then create a token for the fly org you want to expose to your Kubernetes cluster:

```sh
fly tokens create org personal
```

Copy that into the Kubernetes secret `glaceon-operator` in the namespace `glaceon-operator-system` with the name `FLY_API_TOKEN`:

```sh
kubectl create secret generic \
  glaceon-operator \
  --from-literal=FLY_API_TOKEN=<your-token-value> \
  -n glaceon-operator-system
```

Then you can create a MachineProxy resource:

```sh
cat <<'EOF' | kubectl apply -f -
apiVersion: glaceon.friendshipcastle.zip/v1alpha1
kind: MachineProxy
metadata:
  name: twi-ollama
  namespace: flycast
spec:
  org: personal
  region: yyz
  target: http://twi-ollama.flycast
  port: 80
EOF
```

And that's it!
