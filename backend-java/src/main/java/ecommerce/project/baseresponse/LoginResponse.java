package ecommerce.project.baseresponse;

import ecommerce.project.dtorequest.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private int code;
    private String message;
    private UserDTO user;
    private String accessToken;
}
