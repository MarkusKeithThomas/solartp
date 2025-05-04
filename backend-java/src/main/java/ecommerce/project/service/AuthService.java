package ecommerce.project.service;


import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import ecommerce.project.dtorequest.RegisterAdminRequest;
import ecommerce.project.dtorequest.UpdateUserRoleRequest;
import ecommerce.project.dtorequest.UserDTO;
import ecommerce.project.dtoresponse.ResetPasswordDTO;
import ecommerce.project.dtoresponse.UsersResponse;
import ecommerce.project.entity.RoleEntity;
import ecommerce.project.entity.UserEntity;
import ecommerce.project.exception.*;
import ecommerce.project.producer.ResetPasswordProducer;
import ecommerce.project.repository.RoleRepository;
import ecommerce.project.repository.UserRepository;
import ecommerce.project.utils.JWTUtil;
import io.jsonwebtoken.io.IOException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.management.relation.RoleInfoNotFoundException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final JWTUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder;
    private static final String GOOGLE_CLIENT_ID = "707353335287-iqf6miqalqt8d631q468fr2clnqpljc0.apps.googleusercontent.com";

    private final ResetPasswordProducer resetPasswordProducer;


    public AuthService(UserRepository userRepository,
                       JWTUtil jwtUtil,
                       RoleRepository roleRepository,
                       EmailService emailService,
                       ResetPasswordProducer resetPasswordProducer
    ) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = new BCryptPasswordEncoder();
        this.roleRepository = roleRepository;
        this.resetPasswordProducer = resetPasswordProducer;
    }

    public String registerAdmin(RegisterAdminRequest request) {
        Optional<UserEntity> user = userRepository.findByEmail(request.getEmail());
        UserEntity user1;
        if (user.isPresent()) {
            user1 = user.get();
            throw new RegisterException("Email đã đăng kí.");
        } else {
            user1 = new UserEntity();
            user1.setEmail(request.getEmail());
            user1.setName(request.getName());
            user1.setPassword(passwordEncoder.encode(request.getPassword()));
            RoleEntity role = roleRepository.findByName(request.getRole())
                    .orElseThrow(() -> new RegisterException("Role chưa được khởi tạo"));
            user1.setRole(role);
            userRepository.save(user1);
            return "User registered successfully";
        }

    }

    public void updateUserRole(UpdateUserRoleRequest update) {
        UserEntity user = userRepository.findById(update.getUserId())
                .orElseThrow(() -> new UsernameNotFoundException("Tài khoản không tồn tại (ID: " + update.getUserId() + ")"));

        RoleEntity role = roleRepository.findByName(update.getRole())
                .orElseThrow(() -> new UsernameNotFoundException("Vai trò không hợp lệ: " + update.getRole()));

        user.setRole(role);
        userRepository.save(user); // 🔁 Đừng quên save lại nếu không dùng JPA tự flush
    }

    public List<UsersResponse> getListUsersRoleStaffAndAdmin(){
        List<UserEntity> users = userRepository.findByRole_NameIn(List.of("ROLE_ADMIN","ROLE_STAFF","ROLE_USER"));
        List<UsersResponse> list = users.stream().map(item ->{
            UsersResponse usersResponse = new UsersResponse();
            usersResponse.setId(item.getId());
            usersResponse.setRole(item.getRole().getName());
            usersResponse.setEmail(item.getEmail());
            usersResponse.setName(item.getName());
            return usersResponse;
        }).toList();
        return list;
    }

    public boolean resetPassword(String token,String newPassword){
        String email = jwtUtil.extractEmail(token);
        Optional<UserEntity> user = userRepository.findByEmail(email);
        UserEntity user1;
        if (user.isEmpty()) {
            throw new ForgotPassWordException("Email không có trong hệ thống.") ;
        } else {
            user1 = user.get();
            // ✅ Tạo mã reset token và gửi email
            user1.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user1);
            return true;
        }
    }

    public String forgotPassword(String email){
        Optional<UserEntity> user = userRepository.findByEmail(email);
        UserEntity user1;
        if (user.isEmpty()) {
            throw new ForgotPassWordException("Email không có trong hệ thống.") ;
        } else {
            user1 = user.get();
            // ✅ Tạo mã reset token và gửi email
            String accessToken = jwtUtil.generateAccessToken(email,user1.getRole().getName());
            //user1.setPassword(accessToken);
            //userRepository.save(user1);
            resetPasswordProducer.sendResetPasswordEmail(
                    new ResetPasswordDTO(email, accessToken)
            );
            //emailService.sendResetPasswordEmail(email, accessToken);
            return "Vui lòng kiểm tra email.";
        }
    }

    public  UserDTO getUserInfo(String accessToken){
        String email = jwtUtil.extractEmail(accessToken.replace("Bearer ", ""));

        Optional<UserEntity> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            throw new GetInfoException("Tài khoản không tồn tại.");
        }
        UserEntity user = userOptional.get();
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setAvatar(user.getPicture());
        return userDTO;
    }
    public String loginByGoogle(String tokenGoogle){
        // ✅ Xác thực token với Google API
        GoogleIdToken.Payload payload = verifyGoogleToken(tokenGoogle);
        if (payload == null) {
            throw new GoogleLoginException("Payload không có nội dung.");
        }
        String email = payload.getEmail();
        String name = (String) payload.get("name");
        String picture = (String) payload.get("picture");

        Optional<UserEntity> optionalUser = userRepository.findByEmail(email);
        UserEntity userEntity;
        if (optionalUser.isEmpty()){
            userEntity = new UserEntity();
            userEntity.setEmail(email);
            userEntity.setPicture(picture);
            userEntity.setName(name);
            RoleEntity role = roleRepository.findByRole("USER")
                    .orElseThrow(() -> new GoogleLoginException("Role USER chưa được khởi tạo"));

            // Gán role cho UserEntity
            userEntity.setRole(role);
            userRepository.save(userEntity); // Hibernate sẽ không báo lỗi nữa
        } else {
            userEntity = optionalUser.get();
        }
        // ✅ Tạo Access Token của hệ thống
        String accessToken = jwtUtil.generateAccessToken(email,"USER");
        String refreshToken = jwtUtil.generateRefreshToken(email,"USER");
        userEntity.setRefreshToken(refreshToken);
        userRepository.save(userEntity);
        return accessToken;
    }

    public GoogleIdToken.Payload verifyGoogleToken(String token) {
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                new NetHttpTransport(),
                new GsonFactory()
        ).setAudience(Collections.singletonList(GOOGLE_CLIENT_ID))
                .build();

        try {
            GoogleIdToken idToken = verifier.verify(token);
            if (idToken != null) {
                return idToken.getPayload(); // ✅ Token hợp lệ, trả về thông tin user
            }
        } catch (GeneralSecurityException | IOException | java.io.IOException e) {
            e.printStackTrace();
        }
        return null;
    }


    public void saveRefreshToken(UserDTO userDTO, String  refreshToken) {
        Optional<UserEntity> optionalUser = userRepository.findByEmail(userDTO.getEmail());
        UserEntity user;

        if (optionalUser.isEmpty()) {
            // Nếu chưa có user, tạo mới
            user = new UserEntity();
            user.setEmail(userDTO.getEmail());
            RoleEntity role = roleRepository.findByRole("USER")
                    .orElseThrow(() -> new GoogleLoginException("Role USER chưa được khởi tạo"));
            user.setRole(role);
            user.setName(userDTO.getName());
            user.setPicture(userDTO.getAvatar());
            // Cập nhật Refresh Token trong database
            user.setRefreshToken(refreshToken);
            userRepository.save(user);
        } else {
            user = optionalUser.get();
            user.setName(userDTO.getName());
            user.setPicture(userDTO.getAvatar());
            // Cập nhật Refresh Token trong database
            user.setRefreshToken(refreshToken);
            userRepository.save(user);
        }
    }

    public String register(String email, String password) {
        Optional<UserEntity> user = userRepository.findByEmail(email);
        UserEntity user1;
        if (user.isPresent()) {
            user1 = user.get();
            throw new RegisterException("Email đã đăng kí.");
        } else {
            user1 = new UserEntity();
            user1.setEmail(email);
            user1.setPassword(passwordEncoder.encode(password));
            RoleEntity role = roleRepository.findByRole("USER")
                    .orElseThrow(() -> new RegisterException("Role USER chưa được khởi tạo"));
            user1.setRole(role);
            userRepository.save(user1);
            return "User registered successfully";
        }

    }

    public String login(String email, String password, HttpServletResponse response) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new LoginException("User not found"));
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new LoginException("Invalid credentials");
        }
        RoleEntity role = user.getRole();
        System.out.println(role.getName()+ " AuthService");
            String accessToken = jwtUtil.generateAccessToken(email,role.getName());
            String refreshToken = jwtUtil.generateRefreshToken(email,role.getName());

            // Lưu Refresh Token vào DB (nếu cần)
            user.setRefreshToken(refreshToken);
            userRepository.save(user);
            setRefreshTokenCookie(response,refreshToken);
            return accessToken;

    }
    public String refreshToken(String refreshToken, HttpServletResponse response) {
        // Tìm người dùng dựa trên Refresh Token
        UserEntity user = userRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new RuntimeException("Invalid or expired refresh token"));
        RoleEntity role = user.getRole();

        // Nếu token hợp lệ, tạo Access Token và Refresh Token mới
        String newAccessToken = jwtUtil.generateAccessToken(user.getEmail(),role.getName());
        String newRefreshToken = jwtUtil.generateRefreshToken(user.getEmail(),role.getName());

        // Cập nhật Refresh Token mới vào database và vô hiệu hóa cái cũ
        user.setRefreshToken(newRefreshToken);
        userRepository.save(user);

        try {
            setRefreshTokenCookie(response,refreshToken);
            return newAccessToken;
        } catch (RuntimeException e) {
            return e.getMessage();
        }
    }

    public boolean logOut (HttpServletResponse httpServletResponse){
        // Lấy email người dùng từ SecurityContext
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        // Xóa Refresh Token khỏi Database
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new LogoutException("User not found"));
        user.setRefreshToken(null);
        userRepository.save(user);
        // Xóa Refresh Token khỏi Cookie
        Cookie refreshTokenCookie = new Cookie("refreshToken", null);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setPath("/tai-khoan/refresh");
        refreshTokenCookie.setMaxAge(0); // Xóa cookie ngay lập tức
        httpServletResponse.addCookie(refreshTokenCookie);
        if (refreshTokenCookie.getMaxAge() == 0) {
            return true;
        } else {
            return false;
        }
    }
    private void setRefreshTokenCookie(HttpServletResponse response, String refreshToken) {
        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true);//TODO Thay doi false len production
        refreshTokenCookie.setPath("/tai-khoan/refresh");
        refreshTokenCookie.setMaxAge(30 * 24 * 60 * 60);
        response.addCookie(refreshTokenCookie);
    }
}
