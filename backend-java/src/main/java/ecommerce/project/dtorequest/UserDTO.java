package ecommerce.project.dtorequest;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserDTO {
    private int id;
    private String name;
    private String avatar;
    @NotBlank(message = "Email không được bỏ trống.")
    @Email
    private String email;
}
