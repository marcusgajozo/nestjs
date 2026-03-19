FROM node:24-alpine AS base
WORKDIR /api
RUN npm i -g pnpm

FROM base AS development
COPY package.json pnpm-lock.yaml ./
RUN pnpm i
COPY . .
CMD ["npm", "run", "start:dev"]
