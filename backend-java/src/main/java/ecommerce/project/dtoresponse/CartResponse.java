package ecommerce.project.dtoresponse;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class CartResponse {
    private Long cartId;
    private String status;
    private BigDecimal totalAmount;
    private int totalItems;
    private List<CartItemResponse> items;
}
