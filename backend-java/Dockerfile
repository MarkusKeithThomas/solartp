# Sử dụng OpenJDK 23 thay vì OpenJDK 17
FROM openjdk:23-jdk-slim

# Đặt thư mục làm việc trong container
WORKDIR /app

# Copy file JAR vào container
COPY target/solartp.jar app.jar

# Expose cổng 8080
EXPOSE 8080

# Chạy ứng dụng bằng Java 23
ENTRYPOINT ["java", "-jar", "app.jar"]