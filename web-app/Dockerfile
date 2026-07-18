# Built with this folder (llc-site) as the context.
# Railway service: Root Directory = llc-site, Dockerfile Path = Dockerfile.
# llc-site is a standalone project (not part of a workspace), so everything it
# needs is in this directory.
FROM node:22-alpine

RUN corepack enable && corepack prepare pnpm@11.5.0 --activate

WORKDIR /app

# Manifests first for cached installs. pnpm-workspace.yaml carries the
# esbuild build-script approval.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# Source, then build (adapter-node -> ./build).
COPY . .
RUN pnpm build

# adapter-node honours $PORT (Railway injects it, set to 8080 for this service).
EXPOSE 8080
CMD ["node", "build"]
