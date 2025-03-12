package com.cybersoft.ecommerce.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Map;

@Component
public class JwtHelper {
    @Value("${jwt.secret}")
    private String SECRET_KEY;

    private final long ACCESS_TOKEN_EXPIRATION = 1000 * 60 * 15; // 15 phút
    private final long REFRESH_TOKEN_EXPIRATION = 1000 * 60 * 60 * 24 * 7; // 7 ngày
    // ✅ Trích xuất email từ token
    public String extractEmail(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token) // ✅ Giải mã token
                .getBody()
                .getSubject(); // ✅ Lấy `sub` (email)
    }

   public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder() // ✅ Dùng parserBuilder()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(token);
            return true; // ✅ Token hợp lệ
        } catch (ExpiredJwtException e) {
            System.out.println("Token hết hạn!");
        } catch (JwtException e) {
            System.out.println("Token không hợp lệ!");
        }
        return false;
    }
    public String generateAccessToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    public String generateRefreshToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

//    public boolean decryptToken(String token) {
//        boolean result = false;
//
//        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY));
////        SecretKey key = Jwts.SIG.HS256.key().build();
////        String jws = Jwts.builder().subject("Joe").signWith(key).compact();
//
//        try {
//            Jwts.parser().ver(key).build().parseSignedClaims(token);
//            result = true;
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return result;
//    }

//    public String getDataToken(String token) {
//        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY));
//        String data = null;
//
//        try {
//            Claims claims = Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
//            Map<String, Object> roleInfo = (Map<String, Object>) claims.get("roleInfo");
//            System.out.println(roleInfo.get("role"));
//            data = roleInfo.get("role").toString();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return data;
//    }

//    public Claims getClaims(String token){
//        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY));
//        Claims claims = null;
//
//        try {
//            claims = Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
//        } catch (Exception e) {
//            e.printStackTrace();
//            throw new RuntimeException("Token is invalid");
//        }
//        return claims;
//    }
}
