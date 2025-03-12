package ecommerce.project.utils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;

@Component
public class JWTUtil {
    @Value("${jwt.secret}")

    private static final String SECRET_KEY = "h2f8D9sK4vB6nP3zX5qT7wL0J1gC2mY8"; // Thay bằng chuỗi bí mật đủ dài
    private static final long ACCESS_TOKEN_VALIDITY = 1000 * 60 * 60 * 24; // 1 ngay
    private static final long REFRESH_TOKEN_VALIDITY = 1000 * 60 * 60 * 24 * 15; // 15 ngày

    private final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    public String generateToken(String email, long expirationTime) {
        return Jwts.builder()
                .setSubject(email)
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateAccessToken(String email) {
        return generateToken(email, ACCESS_TOKEN_VALIDITY);
    }

    public String generateRefreshToken(String email) {
        return generateToken(email, REFRESH_TOKEN_VALIDITY);
    }

    public String extractEmail(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
