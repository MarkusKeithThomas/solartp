package com.cybersoft.ecommerce.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest{
        @Email(message = "Email không hợp lệ!")
        @NotBlank(message = "Email là bắt buộc!")
        String email;

        @NotBlank(message = "Mật khẩu không được để trống!")
        @Size(min = 6, message = "Mật khẩu phải có ít nhất 6 ký tự!")
        String password;

        String role;
}
