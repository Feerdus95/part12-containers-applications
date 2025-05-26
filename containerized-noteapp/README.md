# NoteApp - Containerized Note Application

*Last updated: 2025-05-26*

> **Note**: This is a containerized version of the NoteApp created for Full Stack Open 2024 Part 12 - Exercise 12.21. The application features a Spring Boot backend and React frontend, containerized with Docker and orchestrated using Docker Compose.

A web application for creating, editing, and organizing notes with categories. Implemented as a Single Page Application (SPA) with a RESTful backend.

## Project Description

NoteApp is an application that allows users to manage digital notes with the following functionalities:

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

## Development with Docker

### Starting the Development Environment

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

## Production Build

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