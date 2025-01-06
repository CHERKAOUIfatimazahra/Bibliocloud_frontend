FROM node:18-alpine AS base

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# ---- Development Stage ----
FROM base AS development

EXPOSE 5173

CMD ["npm", "run", "dev"]

# ---- Build Stage ----
FROM base AS build

RUN npm run build

# ---- Production Stage ----
FROM nginx:alpine AS production

WORKDIR /usr/share/nginx/html

COPY --from=build /app/dist .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
