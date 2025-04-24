package ecommerce.project.dtoresponse;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterSolarPanelResponse {
    private Integer id;
    private String fullName;
    private String phone;
    private String address;
    private String financialRange;
    private String customAmount;
    private String createdAt;
}