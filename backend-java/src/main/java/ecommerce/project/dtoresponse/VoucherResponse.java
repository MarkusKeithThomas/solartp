package ecommerce.project.dtoresponse;


import ecommerce.project.model.DiscountType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VoucherResponse {
    private String code;
    private BigDecimal discount;
    private DiscountType discountType;

}
