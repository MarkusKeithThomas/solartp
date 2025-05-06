package ecommerce.project.dtorequest;

import ecommerce.project.model.DiscountType;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class VoucherUpdateRequest {
    private String code;
    private DiscountType discountType;
    private BigDecimal discount;
    private BigDecimal minOrderValue;
    private BigDecimal maxOrderValue;
    private int used;
    private Integer quantity;
    private Boolean active;
    private String startAt;
    private String endAt;
}
