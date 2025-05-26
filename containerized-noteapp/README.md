# NoteApp - Containerized Note Application

*Last updated: 2025-05-26*

> **Note**: This is a production-ready containerized version of the NoteApp created for Full Stack Open 2024 Part 12 - Exercises 12.21 (Development) and 12.22 (Production). The application features a Spring Boot backend and React frontend, containerized with Docker and orchestrated using Docker Compose.

A web application for creating, editing, and organizing notes with categories. Implemented as a Single Page Application (SPA) with a RESTful backend.

## Project Description

NoteApp is a production-ready containerized application that allows users to manage digital notes with the following features:

### Key Production Features
- **Containerized Architecture**: Fully containerized with Docker and orchestrated using Docker Compose
- **Multi-stage Builds**: Optimized production images with minimal footprint
- **Security**: Non-root user execution, minimal base images, and proper isolation
- **Scalability**: Designed for horizontal scaling with proper state management
- **Monitoring**: Health checks and logging configured for production use
- **Performance**: Production-optimized Nginx configuration with caching and compression

### Application Functionality

### Phase 1 (Implemented)
- Create, edit, and delete notes
- Archive and unarchive notes
- List active notes
- List archived notes

### Phase 2 (Implemented)
- Add/remove categories to notes
- Filter notes by category

## Technologies Used

### Backend
- **Java**: 17
- **Spring Boot**: 3.2.2
- **Spring Data JPA**: For the persistence layer
- **PostgreSQL**: 16 (Relational database)
- **Maven**: Dependency management system

### Frontend
- **React**: 18.x
- **TypeScript**: 5.x
- **Vite**: Build tool
- **React Query**: For state management and API requests
- **Radix UI**: User interface components
- **Tailwind CSS**: Styling framework
- **Axios**: HTTP client for backend communication

## Prerequisites

To run this application you need to have installed:

- **Docker** and **Docker Compose**: For containerization and orchestration
- **Node.js**: v18.17.0 or higher (only needed for local development without containers)
- **npm**: 9.6.0 or higher (only needed for local development without containers)
- **Java**: JDK 17 (only needed for local backend development)
- **Maven**: 3.8.0 or higher (or use the included wrapper, only needed for local backend development)

## Getting Started

### Development Environment

For development with hot-reloading and debugging:

1. Make sure Docker and Docker Compose are installed and running
2. Navigate to the project root directory
3. Run the development environment:
   ```bash
   # Start all services in development mode
   ./start.sh dev
   ```
   
   Or use Docker Compose directly:
   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```

4. Access the application at:
   - Frontend: http://localhost
   - Backend API: http://localhost/api
   - Database: postgres://noteuser:notepass@localhost:5432/noteapp

### Development Features

- **Hot-reloading**: Both frontend and backend support live reloading
- **Containerized Services**:
  - Frontend: React development server
  - Backend: Spring Boot application
  - Database: PostgreSQL
  - Reverse Proxy: Nginx
- **Environment Variables**: Configured through `docker-compose.dev.yml`

### Production Deployment

#### Prerequisites
- Docker 20.10.0 or higher
- Docker Compose 2.0.0 or higher
- At least 2GB of free disk space
- At least 2GB of available RAM

#### Quick Start

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone <repository-url>
   cd containerized-noteapp
   ```

2. Start the application in production mode:
   ```bash
   ./start.sh prod
   ```
   Or using Docker Compose directly:
   ```bash
   docker-compose up --build -d
   ```

3. Access the application at http://localhost

4. (Optional) To monitor the application:
   ```bash
   # View logs
   docker-compose logs -f

   # Check container status
   docker-compose ps

   # View resource usage
   docker stats
   ```

#### Stopping the Application

To stop the application while preserving data:
```bash
docker-compose down
```

To stop and remove all data (including database):
```bash
docker-compose down -v
```

#### Updating the Application

1. Pull the latest changes:
   ```bash
   git pull origin main
   ```

2. Rebuild and restart the services:
   ```bash
   docker-compose up --build -d
   ```

#### Backup and Restore

To create a backup of the database:
```bash
# Create a backup
docker exec -t containerized-noteapp-db-1 pg_dump -U noteuser noteapp > backup_$(date +%Y%m%d).sql

# Restore from backup
cat backup_20250526.sql | docker exec -i containerized-noteapp-db-1 psql -U noteuser -d noteapp
```

#### Environment Configuration

Create a `.env` file in the project root to customize the production environment. Here's the default configuration:

```env
# PostgreSQL
POSTGRES_DB=noteapp
POSTGRES_USER=noteuser
POSTGRES_PASSWORD=notepass

# Spring Boot
SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/noteapp
SPRING_DATASOURCE_USERNAME=noteuser
SPRING_DATASOURCE_PASSWORD=notepass
SPRING_JPA_HIBERNATE_DDL_AUTO=update

# Frontend
VITE_BACKEND_URL=

# Nginx
NGINX_PORT=80
NGINX_HOST=0.0.0.0

# Java
JAVA_OPTS=-Xmx512m -Xms256m
```

## Architecture Overview

The production environment consists of the following services:

1. **Frontend**: Serves the React application via Nginx
2. **Backend**: Spring Boot application handling API requests
3. **Database**: PostgreSQL for data persistence
4. **Reverse Proxy**: Nginx for routing and SSL termination

### Networking

- Frontend is accessible on port 80
- Backend API is available at `/api`
- Database is not exposed externally
- Internal Docker network isolates services

### Data Persistence

- Database data is stored in a Docker volume (`containerized-noteapp_postgres_data`)
- Application logs are stored in the container's filesystem by default

## Monitoring and Maintenance

### Logs

View logs for all services:
```bash
docker-compose logs -f
```

View logs for a specific service:
```bash
docker-compose logs -f [service_name]
```

### Health Checks

Check application health:
```bash
curl -I http://localhost/health
```

### Resource Usage

View container resource usage:
```bash
docker stats
```

## Security Considerations

1. **Network Security**:
   - Only necessary ports are exposed
   - Internal services are not accessible from outside the Docker network

2. **Application Security**:
   - Running as non-root user in containers
   - Regular security updates for base images
   - Proper CORS and security headers

3. **Data Security**:
   - Database credentials are passed via environment variables
   - Sensitive data is not hardcoded in configuration files

## Troubleshooting

### Common Issues

1. **Port Conflicts**:
   - Ensure ports 80 and 5432 are not in use
   - Check running containers: `docker ps`

2. **Database Issues**:
   - Check if PostgreSQL is running: `docker-compose ps db`
   - View database logs: `docker-compose logs db`

3. **Application Not Starting**:
   - Check logs: `docker-compose logs`
   - Verify environment variables are set correctly

4. **Nginx 502 Bad Gateway**:
   - Check if backend is running: `docker-compose ps backend`
   - Verify Nginx config: `docker-compose exec nginx nginx -t`

### Getting Help

If you encounter any issues, please check the following:
1. Docker and Docker Compose are installed and running
2. All required ports are available
3. Sufficient system resources are available
4. Logs for error messages

For additional support, please open an issue in the project repository.

To build and run the production version:

```bash
# Build and start all services in production mode
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Environment Variables

Create a `.env` file in the project root with the following variables:

```
# PostgreSQL
POSTGRES_DB=noteapp
POSTGRES_USER=noteuser
POSTGRES_PASSWORD=notepass

# Spring Boot
SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/noteapp
SPRING_DATASOURCE_USERNAME=noteuser
SPRING_DATASOURCE_PASSWORD=notepass
SPRING_JPA_HIBERNATE_DDL_AUTO=update

# Frontend
VITE_BACKEND_URL=/api
```

## Project Structure

```
containerized-noteapp/
├── backend/                 # Spring Boot application
│   ├── src/
│   │   └── main/
│   │       ├── java/       # Java source code
│   │       └── resources/  # Configuration files
│   ├── Dockerfile          # Production Dockerfile
│   ├── dev.Dockerfile      # Development Dockerfile
│   └── pom.xml             # Maven configuration
│
├── frontend/              # React application
│   ├── public/            # Static files
│   ├── src/               # TypeScript/React source code
│   ├── Dockerfile         # Production Dockerfile
│   ├── dev.Dockerfile     # Development Dockerfile
│   └── package.json       # npm dependencies
│
├── nginx/                # Nginx configurations
│   ├── nginx.dev.conf     # Development config
│   └── nginx.conf         # Production config
├── docker-compose.dev.yml  # Development compose file
├── docker-compose.yml     # Production compose file
└── start.sh              # Utility script for development
```

## Development Workflow

### Using the Development Script

The `start.sh` simplifies the development workflow:

```bash
# Start development environment
./start.sh dev

# View logs
./start.sh logs

# Stop all services
./start.sh stop

# Clean up containers and volumes
./start.sh clean
```

### Hot Reloading
- Frontend changes are automatically reflected in the browser
- Backend changes trigger automatic rebuilds
- Database persists between restarts using named volumes

### Accessing Services
- **Frontend**: http://localhost
- **Backend API**: http://localhost/api
- **Database**: Accessible on port 5432 (PostgreSQL)
- **Nginx Logs**: `docker-compose -f docker-compose.dev.yml logs nginx`
- **Backend Logs**: `docker-compose -f docker-compose.dev.yml logs backend`
- **Database Logs**: `docker-compose -f docker-compose.dev.yml logs db`

## Troubleshooting

### Common Issues

1. **Port Conflicts**:
   - Ensure ports 80, 8080, and 5432 are not in use
   - Check running containers: `docker ps`

2. **Database Connection Issues**:
   - Verify PostgreSQL is running: `docker-compose -f docker-compose.dev.yml ps`
   - Check logs: `docker-compose -f docker-compose.dev.yml logs db`

3. **Build Failures**:
   - Clean Maven build: `./mvnw clean install`
   - Clear npm cache: `npm cache clean --force`

4. **Nginx 502 Bad Gateway**:
   - Check if backend is running: `docker-compose -f docker-compose.dev.yml ps`
   - Verify Nginx config: `docker-compose -f docker-compose.dev.yml exec nginx nginx -t`

### Resetting the Environment

To completely reset the development environment:

```bash
# Stop and remove all containers
./start.sh clean

# Remove all unused volumes
docker volume prune -f

# Remove all unused images
docker image prune -f
```

## Architecture

### Backend

The backend application is structured in layers:

- **Controllers**: Handle HTTP requests and define REST endpoints
- **Services**: Contain business logic
- **Repositories**: Interact with the database
- **Models**: Represent database entities
- **DTOs**: Data transfer objects

### Frontend

The frontend application is organized into:

- **Components**: Reusable interface elements
- **Pages**: Main application views
- **Hooks**: Reusable logic and state management
- **Services**: API communication

## API Documentation

The backend exposes the following RESTful endpoints (all prefixed with `/api`):

### Notes
- `GET /notes` - Get all notes
- `GET /notes/active` - Get active notes
- `GET /notes/archived` - Get archived notes
- `GET /notes/{id}` - Get a specific note
- `POST /notes` - Create a new note
- `PUT /notes/{id}` - Update a note
- `DELETE /notes/{id}` - Delete a note
- `PATCH /notes/{id}/archive` - Archive a note
- `PATCH /notes/{id}/unarchive` - Unarchive a note

### Categories
- `GET /categories` - Get all categories
- `POST /categories` - Create a new category
- `POST /notes/{noteId}/categories/{categoryId}` - Add category to note
- `DELETE /notes/{noteId}/categories/{categoryId}` - Remove category from note

### Health Check
- `GET /actuator/health` - Application health status
- `POST /notes`: Create a new note
- `PUT /notes/{id}`: Update an existing note
- `DELETE /notes/{id}`: Delete a note
- `PATCH /notes/{id}/archive`: Archive a note
- `PATCH /notes/{id}/unarchive`: Unarchive a note
- `GET /notes/category/{categoryId}`: Get notes by category
- `POST /notes/{noteId}/categories/{categoryId}`: Add category to a note
- `DELETE /notes/{noteId}/categories/{categoryId}`: Remove category from a note

## Contribution

To contribute to the project:

1. Fork the repository
2. Create a branch for your feature (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

## CI/CD Pipeline

This project includes a GitHub Actions workflow for continuous integration and deployment:

### Workflow Triggers
- On push to `main` branch (for deployment)
- On pull requests to `main` (for testing)

### Jobs
1. **Test**
   - Runs on: Ubuntu latest
   - Tests backend with Maven
   - Tests frontend with npm
   - Uses PostgreSQL for testing

2. **Deploy** (runs after successful test)
   - Builds and pushes Docker images to Docker Hub
   - Only runs on `main` branch

### Environment Variables
Required GitHub Secrets:
- `DOCKERHUB_USERNAME`: Your Docker Hub username
- `DOCKERHUB_TOKEN`: Your Docker Hub access token

## Local Development with Docker

1. Make sure Docker and Docker Compose are installed
2. Clone the repository
3. Run:
   ```bash
   docker-compose up --build
   ```
4. Access the application:
   - Frontend: http://localhost
   - Backend API: http://localhost:8080

## License

Distributed under the MIT License. See `LICENSE` for more information.