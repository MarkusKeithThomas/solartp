package ecommerce.project.dtoresponse;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class OrderItemResponse {
    private String productSku;
    private String productName;
    private String thumbnailUrl;
    private String unit;

    private Integer quantity;
    private BigDecimal price;
    private BigDecimal totalPrice;
}