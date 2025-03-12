package com.cybersoft.ecommerce.controller;

import com.cybersoft.ecommerce.entity.UserEntity;
import com.cybersoft.ecommerce.request.UserLoginRequest;
import com.cybersoft.ecommerce.response.BaseResponse;
import com.cybersoft.ecommerce.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tai-khoan")
@CrossOrigin
public class LoginController {
    @Autowired
    private LoginService loginService;

    @PostMapping()
    public ResponseEntity<?> login(@RequestBody UserLoginRequest user) {
        // Nếu có lỗi, LoginService sẽ ném `LoginException`
        String token = loginService.login(user.getEmail(), user.getPassword());

        // Nếu không có lỗi, tiếp tục trả về phản hồi
        BaseResponse response = new BaseResponse();
        response.setMessage("Đăng nhập thành công!");
        response.setData(token);
        response.setCode(200);

        return ResponseEntity.ok(response);
    }
}
