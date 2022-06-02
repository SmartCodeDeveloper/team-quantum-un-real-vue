# Multi-stage
# 1) Node image for building frontend assets
# 2) nginx stage to serve frontend assets

# Name the node stage "builder"
FROM node:14 AS builder
# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
COPY . .
# RUN apk add --no-cache git
RUN if test -e package-lock.json; then echo "Package Lock file Exists" && rm package-lock.json; fi
RUN if test -d node_modules; then echo "Node Modules Exists" && rm -rf node_modules; fi
# install node modules and build assets
RUN npm install
# Build
ARG FRONTEND_ENV=production

ENV VUE_APP_ENV=${FRONTEND_ENV}

RUN npm run build

# nginx state for serving content
FROM nginx:alpine
# Set working directory to nginx asset directory
RUN rm -v /etc/nginx/conf.d/default.conf

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/dist .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
