package ecommerce.project.dtorequest;

import lombok.Data;

import java.util.List;

@Data
public class CartRequest {
    private Long userId; // null nếu là guest
    private String uuidToken; // dành cho guest
    private List<CartItemRequest> items;
}
