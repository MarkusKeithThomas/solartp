package ecommerce.project.controller;


import ecommerce.project.baseresponse.BaseResponse;
import ecommerce.project.dto.UserDTO;
import ecommerce.project.request.RequestUser;
import ecommerce.project.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/tai-khoan")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }


    @GetMapping("/check")
    public ResponseEntity<String> checkGoogleConfig() {
        return ResponseEntity.ok("Hello");
    }


    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("password");
        boolean isReset = authService.resetPassword(token,newPassword);
        BaseResponse baseResponse = new BaseResponse();
        if (isReset){
            baseResponse.setCode(200);
            baseResponse.setMessage("Reset password thành công");
            baseResponse.setData(null);
            return ResponseEntity.ok(baseResponse);
        } else {
            baseResponse.setCode(200);
            baseResponse.setMessage("Reset password không thành công");
            baseResponse.setData(null);
            return ResponseEntity.ok(baseResponse);
        }

    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String note = authService.forgotPassword(email);
        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setCode(200);
        baseResponse.setMessage(note);
        baseResponse.setData(null);
        return ResponseEntity.ok(baseResponse);
    }

    @GetMapping("/user-info")
    public ResponseEntity<?> getUserInfo(@RequestHeader("Authorization") String token) {
        UserDTO userDTO = authService.getUserInfo(token);
        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setCode(200);
        baseResponse.setMessage("Lấy thông tin thành công");
        baseResponse.setData(userDTO);
        return ResponseEntity.ok(baseResponse);

    }

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> request) {
        String googleToken = request.get("token");
        String accessToken = authService.loginByGoogle(googleToken);
        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setCode(200);
        baseResponse.setMessage("Tạo tài khoản thành công");
        baseResponse.setData(accessToken);
        return ResponseEntity.ok( baseResponse);
    }


    @PostMapping("/register")
    public ResponseEntity<?> register(@Validated @RequestBody RequestUser requestUser) {
        String mess = authService.register(requestUser.getEmail(), requestUser.getPassword());
        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setCode(200);
        baseResponse.setMessage("Tạo tài khoản thành công");
        baseResponse.setData(mess);
        return ResponseEntity.ok(baseResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody RequestUser requestUser, HttpServletResponse response) {
       String accessToken = authService.login(requestUser.getEmail(), requestUser.getPassword(),response);
       BaseResponse baseResponse = new BaseResponse();
       if (accessToken != null){
           baseResponse.setCode(200);
           baseResponse.setMessage("Đăng nhập thành công.");
           baseResponse.setData(accessToken);
       }
        return ResponseEntity.ok(baseResponse);
    }


    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@CookieValue(value = "refreshToken", required = false) String refreshToken,HttpServletResponse response) {
        BaseResponse baseResponse = new BaseResponse();

        if (refreshToken == null || refreshToken.isEmpty()) {
            baseResponse.setCode(401);
            baseResponse.setMessage("Refresh Token is missing");
            baseResponse.setData(null);
            return ResponseEntity.ok(baseResponse);
        }
        String newaceesToken = authService.refreshToken(refreshToken,response);
        baseResponse.setCode(200);
        baseResponse.setMessage("Refresh tài khoản thành công");
        baseResponse.setData(newaceesToken);
        return ResponseEntity.ok(baseResponse);
    }
    @PostMapping("/log-out")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        BaseResponse baseResponse = new BaseResponse();
        boolean isLogOut = authService.logOut(response);
        if(isLogOut){
            baseResponse.setMessage("Đăng xuất thành công");
            baseResponse.setCode(200);
        } else {
            baseResponse.setMessage("Lỗi khi đăng xuất");
            baseResponse.setCode(200);
        }
        return ResponseEntity.ok(baseResponse);
    }

}
