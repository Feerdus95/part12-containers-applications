# Development stage
FROM node:20 AS development
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY jest.config.js ./
COPY babel.config.js ./
COPY jest.setup.js ./

# Install all dependencies including devDependencies
RUN npm ci

# Copy source code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Default command
CMD ["npm", "run", "dev"]

# Test stage
FROM development AS test
# Run tests
RUN npm test

# Build stage
FROM node:20 AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies including devDependencies for building
RUN npm ci

# Copy source code
COPY . .

# Build the application with environment variables
ARG VITE_BACKEND_URL=/api
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}
RUN echo "VITE_BACKEND_URL=$VITE_BACKEND_URL" > .env
RUN npm run build

# Production stage
FROM nginx:1.25-alpine AS production

# Copy the built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
