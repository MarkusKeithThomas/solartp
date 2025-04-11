package ecommerce.project.dtorequest;

import ecommerce.project.model.AddressType;
import lombok.Data;

@Data
public class ShippingAddressRequest {
    private String fullName;
    private String email;
    private String phone;
    private String addressLine;
    private String province;
    private String district;
    private String ward;
    private String addressNote;
    private AddressType type; // HOME, OFFICE, OTHER
}
