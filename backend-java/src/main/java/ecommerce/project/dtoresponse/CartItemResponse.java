package ecommerce.project.dtoresponse;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class CartItemResponse {
    private Long productId;
    private String productName;
    private String imageUrl;
    private BigDecimal unitPrice;
    private int quantity;
    private BigDecimal discountApplied;
    private BigDecimal totalPrice;
}
