package ecommerce.project.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class CartItemDTO {
    private Long productId;
    private String productName; // optional để hiển thị khi trả về
    private String productImage; // optional
    private int quantity;
    private BigDecimal unitPrice;
    private BigDecimal discountApplied;
    private BigDecimal totalPrice;

    public CartItemDTO(Long productId, Integer quantity) {
        this.productId = productId;
        this.quantity = quantity;
    }
}
