FROM denoland/deno:1.37.2

# The port that your application listens to.
EXPOSE 8000

WORKDIR /app

ARG GIT_REVISION
ENV DENO_DEPLOYMENT_ID=${GIT_REVISION}

USER deno

COPY . .
RUN deno cache --reload main.ts
ENV NODE_ENV=production
ENV HOME=/deno-dir/location_data/.home

CMD ["run", "--unstable", "--allow-all", "main.ts"]
