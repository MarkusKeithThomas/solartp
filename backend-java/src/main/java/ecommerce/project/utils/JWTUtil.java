package ecommerce.project.utils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.Objects;

@Component
public class JWTUtil {

    private static final String SECRET_KEY = "U-H7lHDAv3TnFYRP1iZQvBZ7LsZs3xJBT8tX2qfsVTk="; // Thay bằng chuỗi bí mật đủ dài
    private static final long ACCESS_TOKEN_VALIDITY = 1000 * 60 * 60 * 24; // 1 ngay
    private static final long REFRESH_TOKEN_VALIDITY = 1000 * 60 * 60 * 24 * 15; // 15 ngày

    private final Key key;

    public JWTUtil() {
        this.key = Keys.hmacShaKeyFor(Base64.getUrlDecoder().decode(SECRET_KEY));
    }

    public String generateToken(String email, long expirationTime, String role) {
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateAccessToken(String email,String role) {
        return generateToken(email, ACCESS_TOKEN_VALIDITY,role);
    }

    public String generateRefreshToken(String email,String role) {
        return generateToken(email, REFRESH_TOKEN_VALIDITY,role);
    }

    public String extractEmail(String token) {
        String email = Jwts.parserBuilder().setSigningKey(key).build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
        return Objects.requireNonNullElse(email, "lỗi lấy thông tin email từ user.");
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }
    public String extractRole(String token) {
        Claims claims = extractAllClaims(token);
        return claims.get("role", String.class); // Lấy role dưới dạng String
    }
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(key)
                .parseClaimsJws(token)
                .getBody();
    }
}
