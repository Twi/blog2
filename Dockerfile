FROM denoland/deno:1.35.3

# The port that your application listens to.
EXPOSE 8000

WORKDIR /app

ARG GIT_REVISION
ENV DENO_DEPLOYMENT_ID=${GIT_REVISION}

USER deno

COPY . .
RUN deno cache --reload main.ts
ENV NODE_ENV=production

CMD ["run", "--allow-all", "main.ts"]
