package ecommerce.project.dtorequest;

import lombok.Data;

@Data
public class UpdateUserRoleRequest {
    private Integer userId;
    private String role;
}
