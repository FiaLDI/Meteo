FROM node:22-alpine as deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

FROM node:22-alpine as build
WORKDIR /app
COPY --from=deps /app/ ./
COPY . .
RUN npm run build

FROM node:22-alpine as run
WORKDIR /app
COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]