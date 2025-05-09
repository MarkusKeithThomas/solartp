package ecommerce.project.dtorequest;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CartItemRequest {
    @NotNull
    private Long productId;
    @NotNull
    private int quantity;
}
