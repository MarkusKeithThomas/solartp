package ecommerce.project.dtorequest;

import ecommerce.project.model.DiscountType;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class VoucherUpdateRequest {
    private DiscountType discountType;
    private BigDecimal discountValue;
    private BigDecimal minOrderValue;
    private BigDecimal maxDiscountValue;
    private Integer quantity;
    private Boolean isActive;
    private LocalDateTime startAt;
    private LocalDateTime endAt;
}
