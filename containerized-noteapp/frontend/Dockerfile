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
# Using empty string as Nginx will handle the /api prefix
ENV VITE_BACKEND_URL=
RUN npm run build

# Final stage - just copy the built files
FROM alpine:latest

WORKDIR /app

# Copy built files from build stage
COPY --from=build /app/dist ./dist

# This is a minimal image that just holds the built files
# The actual serving will be done by the nginx service

# Create a non-root user to own the files
RUN addgroup -S appgroup && adduser -S appuser -G appgroup && \
    chown -R appuser:appgroup /app

USER appuser

# The command is just a simple sleep to keep the container running
# In production, this would be served by the nginx service
CMD ["sh", "-c", "echo 'Frontend build complete. This container is not meant to be run directly.' && tail -f /dev/null"]
