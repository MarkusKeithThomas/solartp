package ecommerce.project.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import ecommerce.project.filter.JwtAuthenticationFilter;
import ecommerce.project.service.AuthService;
import ecommerce.project.utils.JWTUtil;
import ecommerce.project.utils.OAuth2LoginSuccessHandler;
import io.jsonwebtoken.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;


import java.util.HashMap;
import java.util.Map;

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
                    auth.requestMatchers(
                            "test/**",
                            "/tai-khoan/login",
                            "/tai-khoan/refresh",
                            "/tai-khoan/register",
                            "/tai-khoan/log-out",
                            "/tai-khoan/reset-request",
                            "/oauth2/**",
                            "/tai-khoan/google",
                            "/check-env",
                            "/tai-khoan/**",
                            "/bai-viet/list/**",
                            "bai-viet/slug/**",
                            "products/getproduct/",
                            "products/details/**",
                            "products/getAllProduct",
                            "products/getAllProductByRedis",
                            "/robots.txt",
                            "categories/get-categories",
                            "products/getAllProduct",
                            "guest/cart/**",
                            "cart/check-stock",
                            "ws-chat/**",
                            "chat/**",
                            "chat/history/paging/**",
                            "vouchers/validate/**",
                            "orders/add",
                            "orders/my",
                            "orders/**",
                            "orders/*/cancel",
                            "orders/*/retry-payment",
                            "orders/*/status",
                            "orders//confirm",
                            "orders/id"
                    ).permitAll(); // ✅ Cho phép OAuth2
                    auth.requestMatchers("orders/*/payment-status","orders/*/status","orders/search","orders/recent").hasAnyAuthority("ROLE_ADMIN","ROLE_STAFF");
                    auth.requestMatchers("vouchers/add","vouchers/id/**").hasAnyAuthority("ROLE_ADMIN","ROLE_STAFF");
                    auth.requestMatchers("products/add","products/delete/**","products/update/**").hasAnyAuthority("ROLE_ADMIN","ROLE_STAFF");
                    auth.requestMatchers("/bai-viet/upload-excel").hasAuthority("ROLE_ADMIN");
                    auth.requestMatchers("/categories/add","/categories","/categories/delete/").hasAnyAuthority("ROLE_ADMIN","ROLE_STAFF");

                    auth.anyRequest().authenticated();
                })
                .exceptionHandling(ex -> ex
                .authenticationEntryPoint(authenticationEntryPoint())
                .accessDeniedHandler(accessDeniedHandler()))
                .oauth2Login(oauth2login -> oauth2login.successHandler(new OAuth2LoginSuccessHandler(jwtUtil,authService))) // ✅ Chỉ cần truyền `oAuth2LoginSuccessHandler`
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class) // ✅ Thêm filter JWT
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public AuthenticationEntryPoint authenticationEntryPoint() {
        return new AuthenticationEntryPoint() {
            @Override
            public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException, java.io.IOException {
                response.setContentType("application/json");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                Map<String, Object> errorDetails = new HashMap<>();
                errorDetails.put("status", HttpStatus.UNAUTHORIZED.value());
                errorDetails.put("error", "Unauthorized");
                errorDetails.put("message", "Bạn chưa đăng nhập hoặc không có quyền truy cập.");
                response.getWriter().write(new ObjectMapper().writeValueAsString(errorDetails));
            }
        };
    }

    @Bean
    public AccessDeniedHandler accessDeniedHandler() {
        return new AccessDeniedHandler() {
            @Override
            public void handle(HttpServletRequest request, HttpServletResponse response, org.springframework.security.access.AccessDeniedException accessDeniedException) throws IOException, ServletException, java.io.IOException {
                response.setContentType("application/json");
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                Map<String, Object> errorDetails = new HashMap<>();
                errorDetails.put("status", HttpStatus.FORBIDDEN.value());
                errorDetails.put("error", "Forbidden");
                errorDetails.put("message", "Bạn không có quyền truy cập vào tài nguyên này.");
                response.getWriter().write(new ObjectMapper().writeValueAsString(errorDetails));
            }
        };
    }
}