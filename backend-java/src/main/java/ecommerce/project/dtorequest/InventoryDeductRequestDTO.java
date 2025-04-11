package ecommerce.project.dtorequest;

import lombok.*;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InventoryDeductRequestDTO implements Serializable {

    private Long orderId;
    private List<ProductQuantity> items;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ProductQuantity implements Serializable {
        private Long productId;
        private Integer quantity;
    }
}
