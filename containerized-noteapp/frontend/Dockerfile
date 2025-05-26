# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./


# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .


# Build the application
ENV VITE_BACKEND_URL=/api
RUN npm run build

# Production stage
FROM nginx:1.25-alpine

# Copy the built app from build stage to nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config if needed
# COPY nginx-custom.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
