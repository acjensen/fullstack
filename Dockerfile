FROM --platform=linux/arm64 node:20 AS build
WORKDIR /app
COPY package*.json ./
COPY pnpm-lock.yaml ./
# See https://github.com/npm/cli/issues/3208#issuecomment-1002990902
RUN mkdir node_modules
RUN npm install -g pnpm
# For now, skip cypress install
ENV CYPRESS_INSTALL_BINARY=0
RUN pnpm install --frozen-lockfile
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run next:build



FROM --platform=linux/arm64 node:20
WORKDIR /app

# TODO: don't copy .git
COPY --from=build /app/.git ./.git
# .env has AUTH_SECRET for local builds
COPY --from=build /app/.env ./.env
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --chown=nextjs:nodejs --from=build /app/.next  ./.next

EXPOSE 80
# TODO: use ENTRYPOINT instead of CMD so ctrl-c works for local dev
CMD ["npm", "run", "next:start", "--", "-p", "80"]
