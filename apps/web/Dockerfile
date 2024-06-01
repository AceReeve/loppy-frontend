# Use the official Node.js image as the base
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /usr/src/app
RUN npm i -g turbo
COPY . .

# Generate a partial monorepo with a pruned lockfile for a target workspace.
RUN turbo prune web --docker # Assuming "web" is the name entered in the project's package.json: { name: "web" }

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /usr/src/app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /usr/src/app/out/json/ .
COPY --from=builder /usr/src/app/out/package-lock.json ./package-lock.json
RUN npm install

# Build the project
COPY --from=builder /usr/src/app/out/full/ .
RUN npx turbo run build --filter=web...

FROM base AS runner
WORKDIR /usr/src/app

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /usr/src/app/apps/web/next.config.mjs .
COPY --from=installer /usr/src/app/apps/web/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /usr/src/app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /usr/src/app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /usr/src/app/apps/web/public ./apps/web/public

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD node apps/web/server.js