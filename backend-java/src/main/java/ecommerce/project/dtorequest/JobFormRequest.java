package ecommerce.project.dtorequest;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class JobFormRequest {
    private String fullName;
    private String phone;
    private String email;
    private String experience;
    private MultipartFile file;
}
