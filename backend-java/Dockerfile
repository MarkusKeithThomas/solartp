# Sử dụng JDK để chạy ứng dụng
FROM eclipse-temurin:23-jdk

# Đặt thư mục làm việc trong container
WORKDIR /app

COPY wait-for-it.sh .
RUN chmod +x wait-for-it.sh

# Copy file JAR đã build sẵn ở local
COPY target/solartp.jar app.jar

# Mở port (tùy backend bạn chạy ở port nào, ví dụ 8080)
EXPOSE 8080

# Chạy ứng dụng
ENTRYPOINT ["./wait-for-it.sh", "mysql_local:3306", "--", "java", "-jar", "app.jar"]