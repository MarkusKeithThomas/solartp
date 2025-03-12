package com.cybersoft.ecommerce.controller;

import com.cybersoft.ecommerce.service.GoogleAuthService;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class GoogleAuthController {

    private final GoogleAuthService googleAuthService;

    public GoogleAuthController(GoogleAuthService googleAuthService) {
        this.googleAuthService = googleAuthService;
    }

    @PostMapping("/google")
    public ResponseEntity<?> loginWithGoogle(@RequestParam("idToken") String idToken) {
        try {
            GoogleIdToken.Payload payload = googleAuthService.verifyGoogleToken(idToken);

            Map<String, Object> userInfo = new HashMap<>();
            userInfo.put("email", payload.getEmail());
            userInfo.put("name", payload.get("name"));
            userInfo.put("picture", payload.get("picture"));

            return ResponseEntity.ok(userInfo);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid Google Token");
        }
    }
}