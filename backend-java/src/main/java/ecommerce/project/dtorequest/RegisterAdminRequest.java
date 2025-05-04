package ecommerce.project.dtorequest;

import lombok.Data;

@Data
public class RegisterAdminRequest {
    private String email;
    private String name;
    private String password;
    private String role;
}
