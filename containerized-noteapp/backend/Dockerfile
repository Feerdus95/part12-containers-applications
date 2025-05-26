# Build stage
FROM maven:3.9.6-eclipse-temurin-17 AS build

WORKDIR /app

# Copy the POM file
COPY pom.xml .

# Download dependencies
RUN mvn dependency:go-offline -B

# Copy the source code
COPY src ./src

# Build the application
RUN mvn package -DskipTests

# Production stage
FROM eclipse-temurin:17-jre-jammy

# Create a non-root user and switch to it
RUN groupadd -r spring && useradd -r -g spring spring
USER spring

WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build --chown=spring:spring /app/target/*.jar app.jar

# Expose the port the app runs on
EXPOSE 8080

# Add health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:8080/api/actuator/health || exit 1

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
