package ecommerce.project.dtorequest;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterSolarPanelRequest {
    private String fullName;
    private String phone;
    private String address;
    private String financialRange;
    private String customAmount;
}