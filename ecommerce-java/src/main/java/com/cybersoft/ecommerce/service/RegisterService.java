package com.cybersoft.ecommerce.service;

import com.cybersoft.ecommerce.entity.RoleEntity;
import com.cybersoft.ecommerce.entity.UserEntity;
import com.cybersoft.ecommerce.exception.InsertException;
import com.cybersoft.ecommerce.exception.RegisterException;
import com.cybersoft.ecommerce.repository.RoleRepository;
import com.cybersoft.ecommerce.repository.UserRepository;
import com.cybersoft.ecommerce.request.RegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RegisterService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void register(RegisterRequest request) {
        // 1️⃣ Kiểm tra email đã tồn tại chưa
        Optional<UserEntity> existingUser = userRepository.findByEmail(request.getEmail());
        if (existingUser.isEmpty()){
            String encodedPassword = passwordEncoder.encode(request.getPassword());

            UserEntity user = new UserEntity();
            user.setEmail(request.getEmail());
            user.setPassword(encodedPassword);
            // ✅ Lấy role từ database thay vì tạo mới
            RoleEntity roleEntity = roleUserRepository.findByRole("USER")
                    .orElseThrow(() -> new RuntimeException("Vai trò không tồn tại!"));
            user.setRole(roleEntity);
            userRepository.save(user);

        } else {
            throw new RegisterException("Email đã đăng kí tài khoản!!!");
        }
    }
}
