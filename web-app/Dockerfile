# syntax=docker/dockerfile:1

# ---- build stage ----
FROM node:22-alpine AS build

RUN corepack enable && corepack prepare pnpm@11.5.0 --activate
WORKDIR /app

# Manifests first so the install layer is cached until the lockfile changes.
# pnpm-workspace.yaml carries the build-script approvals (esbuild, @tailwindcss/oxide).
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# --mount=type=cache keeps the pnpm store warm across builds -> fast reinstalls.
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# Source, then build (adapter-node -> ./build).
COPY . .
RUN pnpm build

# ---- runtime stage ----
FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Only what the server needs at runtime: the built output + deps.
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./package.json

# adapter-node reads $PORT (Railway injects it) and defaults to 3000.
EXPOSE 3000
CMD ["node", "build"]
