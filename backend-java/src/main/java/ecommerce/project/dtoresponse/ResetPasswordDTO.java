package ecommerce.project.dtoresponse;

import lombok.*;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResetPasswordDTO implements Serializable {
    private String email;
    private String resetToken;
}
