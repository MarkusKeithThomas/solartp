package com.cybersoft.ecommerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Base64;

@SpringBootApplication
@EnableCaching
public class EcommerceApplication {

	public static void main(String[] args) {
		SpringApplication.run(EcommerceApplication.class, args);
		// 🔹 Tạo Key ngẫu nhiên 256-bit
		Key key = Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS256);

		// 🔹 Chuyển thành Base64 để lưu trữ
		String base64Key = Base64.getEncoder().encodeToString(key.getEncoded());

		System.out.println("Khóa bí mật mới (Base64): " + base64Key);
	}

}
