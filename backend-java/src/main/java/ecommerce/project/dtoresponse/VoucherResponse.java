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
    private int id;
    private String code;
    private BigDecimal discount;
    private DiscountType discountType;
    private BigDecimal minOrderValue;
    private BigDecimal maxOrderValue;
    private int quantity;
    private int used;
    private boolean isActive;
    private String startAt;
    private String endAt;
    private String createdAt;
    private String updatedAt;

}
