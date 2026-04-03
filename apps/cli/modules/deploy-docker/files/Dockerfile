FROM __DOCKER_BASE_IMAGE__ AS deps
WORKDIR /app
COPY package.json ./
COPY tsconfig.json ./
COPY next.config.ts ./
COPY eslint.config.mjs ./
COPY prettier.config.mjs ./
COPY playwright.config.ts ./
COPY vitest.config.ts ./
COPY drizzle.config.ts ./
COPY . .
__DOCKER_SETUP__
RUN __DOCKER_INSTALL_COMMAND__

FROM deps AS builder
WORKDIR /app
RUN __DOCKER_BUILD_COMMAND__

FROM __DOCKER_BASE_IMAGE__ AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app ./
__DOCKER_SETUP__
EXPOSE 3000
CMD ["/bin/sh", "-c", "__DOCKER_START_COMMAND__"]
