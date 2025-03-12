package com.cybersoft.ecommerce.service;

import com.cybersoft.ecommerce.dto.GoogleUserInfo;
import com.cybersoft.ecommerce.entity.UserEntity;
import com.cybersoft.ecommerce.repository.UserRepository;
import com.cybersoft.ecommerce.utils.JwtHelper;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtHelper jwtUtil;

    public AuthService(UserRepository userRepository, JwtHelper jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    public ResponseEntity<?> loginWithGoogle(String googleToken, HttpServletResponse response) {
        GoogleUserInfo userInfo = validateGoogleToken(googleToken);
        if (userInfo == null) {
            return ResponseEntity.status(401).body("Invalid Google token");
        }

        // Kiểm tra user có trong DB chưa, nếu chưa thì lưu
        Optional<UserEntity> existingUser = userRepository.findByEmail(userInfo.getEmail());
        if (existingUser.isEmpty()) {
            UserEntity newUser = new UserEntity();
            newUser.setEmail(userInfo.getEmail());
            newUser.setName(userInfo.getName());
            newUser.setPicture(userInfo.getPicture());
            userRepository.save(newUser);
        }

        // Tạo JWT Token
        String accessToken = jwtUtil.generateAccessToken(userInfo.getEmail());
        String refreshToken = jwtUtil.generateRefreshToken(userInfo.getEmail());

        // Lưu Refresh Token vào HTTP-Only Cookie
        Cookie cookie = new Cookie("refreshToken", refreshToken);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        response.addCookie(cookie);

        return ResponseEntity.ok(Map.of("accessToken", accessToken, "user", userInfo));
    }

    public ResponseEntity<?> refreshToken(String refreshToken) {
        if (refreshToken == null || !jwtUtil.validateToken(refreshToken)) {
            return ResponseEntity.status(401).body("Invalid refresh token");
        }

        String email = jwtUtil.extractEmail(refreshToken);
        String newAccessToken = jwtUtil.generateAccessToken(email);
        return ResponseEntity.ok(Map.of("accessToken", newAccessToken));
    }

    private GoogleUserInfo validateGoogleToken(String token) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String url = "https://oauth2.googleapis.com/tokeninfo?id_token=" + token;
            return restTemplate.getForObject(url, GoogleUserInfo.class);
        } catch (Exception e) {
            return null;
        }
    }
}