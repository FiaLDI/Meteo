FROM node:22-alpine AS deps

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY prisma ./prisma
RUN npx prisma generate

FROM node:22-alpine AS build

WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:22-alpine

WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma.config.ts ./prisma.config.ts
COPY package.json ./
EXPOSE 8000

CMD sh -c "npx prisma migrate deploy && node dist/src/main.js"
