FROM maven:3.9.6-eclipse-temurin-17

WORKDIR /usr/src/app

# Copy the POM file first to leverage Docker cache
COPY pom.xml .

# Download dependencies
RUN mvn dependency:go-offline -B

# Copy the rest of the source code
COPY . .

# Run the application in development mode
CMD ["mvn", "spring-boot:run", "-Dspring-boot.run.jvmArguments=-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005"]
