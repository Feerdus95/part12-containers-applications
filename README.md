# Full Stack Open - Part 12: Containers

This repository contains the exercises and applications for the Containers part of the Full Stack Open course. The focus of this part is on containerization using Docker, which allows packaging applications and their dependencies into standardized units for software development and deployment.

## Course Content

This part covers:
- Introduction to containers and Docker
- Running containers
- Building custom Docker images
- Container orchestration with Docker Compose
- Working with databases in containers (MongoDB, Redis)

## Exercises

### Exercise 12.1: Using a computer (without graphical user interface)
- Created a script to fetch content from http://helsinki.fi
- Output saved to: `script-answers/exercise12_1.txt`

### Exercise 12.2: Running your second container
- Ran an Ubuntu container with interactive terminal
- Created directory structure and files within the container
- Output saved to: `script-answers/exercise12_2.txt`

### Exercise 12.3: Ubuntu 101
- Installed nano text editor in the container
- Created and edited a simple JavaScript file
- Output saved to: `script-answers/exercise12_3.txt`

### Exercise 12.4: Ubuntu 102
- Installed Node.js in the container
- Successfully ran a simple JavaScript program
- Output saved to: `script-answers/exercise12_4.txt`

### Exercise 12.5: Todo application backend
- Containerized a Node.js Express backend
- Configured MongoDB for data persistence
- Set up basic API endpoints for todo operations

### Exercise 12.6: Docker Compose
- Created docker-compose.yml for the todo application
- Configured MongoDB service
- Set up networking between services

### Exercise 12.7: MongoDB initialization
- Configured MongoDB with initial data
- Set up authentication and database initialization
- Created MongoDB initialization script

### Exercise 12.8: MongoDB command line interface
- Accessed MongoDB using the mongo shell
- Performed database operations directly
- Verified data persistence

### Exercise 12.9: Redis setup
- Added Redis service to docker-compose
- Configured Redis connection in the application
- Verified Redis connectivity

### Exercise 12.10: Todo counter with Redis
- Implemented a counter for created todos
- Created a statistics endpoint
- Stored counter data in Redis

### Exercise 12.11: Redis CLI
- Accessed Redis using redis-cli
- Verified data persistence
- Manipulated Redis data directly

### Exercise 12.12: Data persistence
- Configured Redis data persistence
- Verified data survives container restarts
- Set up proper volume configuration

### Exercise 12.13: Todo application frontend
- Containerized the React frontend with Docker
- Configured Nginx to serve the frontend and proxy API requests
- Set up environment variables for backend URL configuration
- Integrated frontend with the containerized backend service

### Exercise 12.14: Frontend testing
- Extracted Todo component into a separate file
- Implemented comprehensive tests using Jest and React Testing Library
- Updated Dockerfile to run tests during build
- Fixed todo toggle functionality (done/undone)
- Added proper prop types and error handling

### Exercise 12.15: Development Environment Setup
- Created `docker-compose.dev.yml` for development with hot-reloading
- Configured volume mounts for live code updates
- Set up proper CORS and CSP headers
- Added debug-helper service for testing container connectivity
- Implemented development-specific Dockerfile with dev server
- Configured Vite proxy for API requests in development
- Added proper networking between containers

### Exercise 12.17-12.19: Nginx Reverse Proxy
- Set up Nginx as a reverse proxy for the application
- Configured routing for frontend and backend services
- Updated frontend to work with the reverse proxy
- Added proper request/response handling with necessary headers
- Configured WebSocket support for development
- Set up proper timeouts and buffer sizes

### Exercise 12.20: Containerized Todo Application
- Containerized the full-stack Todo application with Docker Compose
- Configured services for frontend, backend, MongoDB, and Redis
- Set up proper networking and environment variables
- Ensured data persistence with Docker volumes
- Verified all services work together correctly

### Exercise 12.21: Containerized Note Application (Development)
- Containerized a full-stack note-taking application with Spring Boot backend and React frontend
- Set up development environment with hot-reloading for both frontend and backend
- Configured Nginx as a reverse proxy for development
- Implemented PostgreSQL database with proper container networking
- Added environment variables for configuration
- Created comprehensive development setup with Docker Compose

### Exercise 12.22: Containerized Note Application (Production)
- Created production-ready Dockerfiles for both frontend and backend
- Configured Nginx for production with optimized settings
- Set up proper container orchestration with Docker Compose
- Implemented health checks and proper container lifecycle management
- Configured environment-specific settings for production
- Ensured proper security practices (non-root users, minimal images)
- Set up proper volume management for persistent data
- Verified all services work together in production configuration

## Project Structure

```
part12-containers-applications/
├── script-answers/       # Exercise solution files
│   ├── exercise12_1.txt
│   ├── exercise12_2.txt
│   ├── exercise12_3.txt
│   └── exercise12_4.txt
└── todo-app/                # Todo application
    ├── docker-compose.yml           # Main compose file for production
    ├── docker-compose.dev.yml       # Development overrides
    ├── nginx.dev.conf               # Nginx configuration for development
    ├── todo-backend/                # Backend service
    │   ├── Dockerfile               # Production backend image
    │   ├── dev.Dockerfile           # Development backend with hot-reload
    │   ├── docker-compose.yml       # Backend-specific compose
    │   ├── docker-compose.dev.yml   # Backend dev overrides
    │   ├── mongo/                   # MongoDB initialization scripts
    │   ├── mongo_data/              # MongoDB persistent data
    │   ├── redis/                   # Redis configuration
    │   ├── redis_data/              # Redis persistent data
    │   ├── routes/                  # API route handlers
    │   └── util/                    # Utility functions
    └── todo-frontend/               # Frontend application
        ├── Dockerfile               # Production frontend build
        ├── Dockerfile.dev           # Development server
        ├── nginx.conf               # Production Nginx config
        ├── vite.config.js           # Vite configuration
        ├── public/                  # Static assets
        └── src/                     # React application source

    # Old frontend (kept for reference)
    └── old-todo-frontend/          # Previous frontend version
        ├── src/
        └── public/
```

## Prerequisites

- Docker and Docker Compose installed
- Basic command line knowledge
- Node.js (for development)

## Getting Started

### Production (Todo App Example)

1. Navigate to the todo-app directory:
   ```bash
   cd todo-app
   ```

2. Start the application:
   ```bash
   docker-compose up --build -d
   ```

3. Access the application at http://localhost

### Production (Note App Example)

1. Navigote to the containerized-noteapp directory:
   ```bash
   cd containerized-noteapp
   ```

2. Start the application:
   ```bash
   ./start.sh prod
   ```
   
   Or use Docker Compose directly:
   ```bash
   docker-compose up --build -d
   ```

3. Access the application at http://localhost

### Development

1. Clone this repository
   ```bash
   git clone https://github.com/Feerdus95/part12-containers-applications.git
   cd part12-containers-applications/todo-app
   ```

2. Start the application with Docker Compose:
   ```bash
   docker-compose up --build
   ```

3. Access the application:
   - Frontend: http://localhost
   - Backend API: http://localhost/api
   - MongoDB: localhost:27017
   - Redis: localhost:6379
   - Health Check: http://localhost/health

### Development

1. Start the development environment:
   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```

2. The development environment includes:
   - Nginx reverse proxy on port 80
   - Frontend with hot-reloading: http://localhost
   - Backend API: http://localhost/api
   - Debug helper for testing connectivity between services
   - WebSocket support for development
   - Volume mounts for live code updates

### Testing

To run tests:
```bash
# For frontend tests
cd todo-frontend
npm test

# Or run tests during Docker build:
docker-compose up --build

# For development testing with watch mode
cd todo-frontend
npm run test:watch
```

## API Endpoints

### Todo API
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
  ```json
  {
    "text": "Todo text",
    "done": false
  }
  ```
- `GET /api/todos/:id` - Get a specific todo
- `PUT /api/todos/:id` - Update a todo
  ```json
  {
    "text": "Updated text",
    "done": true
  }
  ```
- `DELETE /api/todos/:id` - Delete a todo

### Statistics
- `GET /api/statistics` - Get todo statistics
  ```json
  {
    "total_todos": 5,
    "completed_todos": 2
  }
  ```

## Development

- Nginx reverse proxy runs on port 80
- Backend API is available at /api
- Frontend is served from the root path
- MongoDB is available on port 27017
- Redis runs on port 6379
- Health check endpoint at /health

## Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [MongoDB Docker Image](https://hub.docker.com/_/mongo)
- [Redis Docker Image](https://hub.docker.com/_/redis)
- [Full Stack Open - Part 12](https://fullstackopen.com/en/part12)

## License

This project is part of the Full Stack Open course. See the course materials for licensing information.
