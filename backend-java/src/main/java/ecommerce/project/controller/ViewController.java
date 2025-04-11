package ecommerce.project.controller;

import ecommerce.project.dto.TimeResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Map;

@RestController()
@RequestMapping("test/")
public class ViewController {
    @Value("${app.frontend.url}")
    private String frontendUrl;

    @Value("${spring.datasource.url}")
    private String databaseUrl;

    @Value("${jwt.secret}")
    private String jwtSecret;

    @GetMapping("/check-env")
    public String checkEnv() {
        return "Frontend URL: " + frontendUrl + "<br>" +
                "Database URL: " + databaseUrl + "<br>" +
                "JWT Secret: " + jwtSecret;
    }
    @GetMapping("/test-datetime")
    public TimeResponse testTime() {
        return new TimeResponse(LocalDateTime.now());
    }
}
