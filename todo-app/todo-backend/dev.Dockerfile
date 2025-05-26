FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Install Nodemon globally for development
RUN npm install -g nodemon

# Copy package files
COPY package*.json ./


# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Set execute permissions
RUN chmod +x ./bin/www

# Environment variables
ENV NODE_ENV=development
ENV DEBUG=*
ENV PORT=3001

# Expose the port
EXPOSE 3001

# Default command (can be overridden in docker-compose)
CMD ["sh", "-c", "echo 'Starting with default CMD...' && nodemon --legacy-watch ./bin/www"]
