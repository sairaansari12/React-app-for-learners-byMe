FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
COPY public ./public
COPY src ./src
RUN npm ci
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules
EXPOSE 80
CMD ["npx", "serve", "-s", "build", "-l", "80"]
