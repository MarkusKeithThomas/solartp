package ecommerce.project.dtoresponse;

import ecommerce.project.model.AddressType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ShippingAddressResponse {
    private String fullName;
    private String email;
    private String phone;

    private String addressLine;
    private String province;
    private String district;
    private String ward;

    private String addressNote;
    private AddressType type;
}