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

## Project Structure

```
part12-containers-applications/
├── script-answers/       # Exercise solution files
│   ├── exercise12_1.txt
│   ├── exercise12_2.txt
│   ├── exercise12_3.txt
│   └── exercise12_4.txt
└── todo-app/             # Todo application
    └── todo-backend/     # Backend service
        ├── Dockerfile    # Backend Docker configuration
        ├── docker-compose.yml
        ├── docker-compose.dev.yml
        ├── mongo/        # MongoDB configuration
        └── redis/        # Redis configuration
```

## Prerequisites

- Docker and Docker Compose installed
- Basic command line knowledge
- Node.js (for development)

## Getting Started

1. Clone this repository
2. Navigate to the todo-backend directory:
   ```bash
   cd part12-containers-applications/todo-app/todo-backend
   ```
3. Start the development environment:
   ```bash
   docker compose -f docker-compose.dev.yml up -d
   ```
4. The application will be available at http://localhost:3000

## API Endpoints

### Todo API
- `GET /todos` - Get all todos
- `POST /todos` - Create a new todo
- `GET /todos/:id` - Get a specific todo
- `PUT /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo

### Statistics
- `GET /statistics` - Get todo counter

## Development

- Backend runs on port 3000
- MongoDB is available on port 3456
- Redis runs on port 6379

## Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [MongoDB Docker Image](https://hub.docker.com/_/mongo)
- [Redis Docker Image](https://hub.docker.com/_/redis)
- [Full Stack Open - Part 12](https://fullstackopen.com/en/part12)

## License

This project is part of the Full Stack Open course. See the course materials for licensing information.
