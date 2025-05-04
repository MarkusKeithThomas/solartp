package ecommerce.project.dtoresponse;

import lombok.Data;

@Data
public class UsersResponse {
    private int id;
    private String email;
    private String name;
    private String role;
}
