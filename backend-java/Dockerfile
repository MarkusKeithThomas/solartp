# Sử dụng OpenJDK 23 thay vì OpenJDK 17
FROM openjdk:23-jdk-slim
WORKDIR /app

# COPY target/solartp.jar app.jar
# THÀNH:
COPY target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]