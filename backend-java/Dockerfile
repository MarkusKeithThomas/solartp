# /opt/solartp/backend-java/Dockerfile (trong repo)
FROM maven:3.9-eclipse-temurin-23 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn -B -DskipTests dependency:go-offline
COPY src ./src
RUN mvn -B -DskipTests package

FROM openjdk:23-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENV JAVA_TOOL_OPTIONS="-Xms256m -Xmx384m -XX:+UseG1GC -XX:MaxGCPauseMillis=200"
ENTRYPOINT ["java","-jar","/app/app.jar"]