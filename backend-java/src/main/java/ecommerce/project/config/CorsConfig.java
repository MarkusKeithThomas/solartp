package ecommerce.project.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.Arrays;

@Configuration
@EnableWebMvc
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurer() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList(
                "http://localhost:5173",
                "https://solartp.com.vn",
                "http://127.0.0.1:5500",
                "https://*.solartp.pages.dev",
                "http://127.0.0.1:5501")); // ✅ Cho phép frontend truy cập

        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")); // ✅ Cho phép tất cả phương thức HTTP
        configuration.setAllowedHeaders(Arrays.asList("*")); // ✅ Cho phép tất cả header
        configuration.setAllowCredentials(true); // ✅ Quan trọng để gửi cookie (Refresh Token)

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // ✅ Áp dụng CORS cho tất cả API
        return source;
    }
}