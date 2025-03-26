package ecommerce.project.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductVariantDTO {
    private String skuCode;
    private String name;
    private String wattProduct;
    private BigDecimal price;
    private Integer stockQuantity;
    private String note;
}
