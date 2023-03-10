FROM denoland/deno:1.31.1

# The port that your application listens to.
EXPOSE 8000

WORKDIR /app

USER deno

COPY . .
RUN deno cache --reload --lock=deno.lock main.ts
ENV NODE_ENV=production

CMD ["run", "--allow-all", "main.ts"]
