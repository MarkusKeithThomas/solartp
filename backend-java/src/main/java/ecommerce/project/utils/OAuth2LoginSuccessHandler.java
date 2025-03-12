package ecommerce.project.utils;

import ecommerce.project.dto.UserDTO;
import ecommerce.project.entity.UserEntity;
import ecommerce.project.repository.UserRepository;
import ecommerce.project.service.AuthService;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;

@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JWTUtil jwtUtil;
    private final AuthService authService;

    public OAuth2LoginSuccessHandler(JWTUtil jwtUtil,AuthService authService) {
        this.jwtUtil = jwtUtil;
        this.authService = authService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();
        String email = oauthUser.getAttribute("email");
        String name = oauthUser.getAttribute("name");
        String picture = oauthUser.getAttribute("picture");

        UserDTO userDTO = new UserDTO();
        userDTO.setEmail(email);
        userDTO.setName(name);
        userDTO.setAvatar(picture);
         // ✅ Tạo Access Token & Refresh Token
            String accessToken = jwtUtil.generateToken(email, 1000 * 60 * 60 * 24); // 15 phút
            String refreshToken = jwtUtil.generateToken(email, 1000 * 60 * 60 * 24 * 15); // 7 ngày
            authService.saveRefreshToken(userDTO,refreshToken);
            response.sendRedirect("http://localhost:5173/login-success?accessToken=" + accessToken);
    }
}