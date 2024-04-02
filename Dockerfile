# Base image
FROM node:18.14.0-alpine3.17 AS base
WORKDIR /usr/src/app
COPY package*.json ./

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
RUN npm install --save


# Build stage for development
FROM deps AS dev
COPY . .
CMD [ "npm", "run", "start:dev" ]


# Build the app with cached dependencies for production
FROM deps AS builder
COPY . .
RUN npm run build

# Production stage
FROM base AS prod
COPY --from=builder /usr/src/app/dist ./dist
COPY package*.json ./
RUN npm install --only=production
CMD [ "npm", "run", "start:prod" ]

EXPOSE 3000
