package ecommerce.project.dtorequest;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class OrderItemRequest {
    private Long productId;
    private Integer quantity;
}
