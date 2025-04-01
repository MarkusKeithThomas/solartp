package ecommerce.project.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RequestUser {
    @NotBlank(message = "Email không được bỏ trống.")
    @Email
    private String email;
    @NotBlank(message = "Password không được bỏ trống")
    private String password;
}
