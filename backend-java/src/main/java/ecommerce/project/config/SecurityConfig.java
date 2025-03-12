package ecommerce.project.config;

import ecommerce.project.filter.JwtAuthenticationFilter;
import ecommerce.project.repository.UserRepository;
import ecommerce.project.service.AuthService;
import ecommerce.project.utils.JWTUtil;
import ecommerce.project.utils.OAuth2LoginSuccessHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private AuthService authService;
    private JWTUtil jwtUtil;
    private final CorsConfigurationSource corsConfigurer;



    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter,AuthService authService,JWTUtil jwtUtil,CorsConfigurationSource corsConfigurer) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.authService = authService;
        this.jwtUtil = jwtUtil;
        this.corsConfigurer = corsConfigurer;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable()) // ✅ Tắt CSRF vì đây là API RESTful
                .cors(cors -> cors.configurationSource(corsConfigurer)) // ✅ Bật CORS trong Security
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // ✅ Không dùng session
                .authorizeHttpRequests(auth -> {
                    auth.requestMatchers("/tai-khoan/login",
                            "/tai-khoan/refresh",
                            "/tai-khoan/register",
                            "/tai-khoan/log-out",
                            "/oauth2/**",
                            "/tai-khoan/google",
                            "/").permitAll(); // ✅ Cho phép OAuth2
                    auth.anyRequest().authenticated();
                })
                .oauth2Login(oauth2login -> oauth2login.successHandler(new OAuth2LoginSuccessHandler(jwtUtil,authService))) // ✅ Chỉ cần truyền `oAuth2LoginSuccessHandler`
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class) // ✅ Thêm filter JWT
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}