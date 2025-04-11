package ecommerce.project.dtoresponse;

import ecommerce.project.dto.CartItemDTO;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class CartResponse {
    private Long cartId;
    private long userId;
    private String status;
    private BigDecimal totalAmount;
    private int totalItems;
    private List<CartItemResponse> items;

    public CartResponse(Long id, Integer userId, List<CartItemResponse> itemDTOs, BigDecimal total) {
        this.cartId = id;
        this.userId = userId;
        this.items = itemDTOs;
        this.totalAmount = total;
    }
}
