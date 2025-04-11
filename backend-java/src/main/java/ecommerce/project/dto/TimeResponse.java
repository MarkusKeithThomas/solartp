package ecommerce.project.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class TimeResponse {
    private String now;

    public TimeResponse(LocalDateTime now) {
        this.now = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss"));
    }

    public String getNow() {
        return now;
    }
}