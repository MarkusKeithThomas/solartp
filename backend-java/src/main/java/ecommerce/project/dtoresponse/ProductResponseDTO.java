package ecommerce.project.dtoresponse;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Data
public class ProductResponseDTO {
    private Long id;
    private String skuProduct;
    private String name;
    private String slug;
    private String description;
    private BigDecimal newPrice;
    private BigDecimal oldPrice;
    private Integer stockQuantity;
    private Integer soldQuantity;
    private String wattage;
    private Boolean isActive;
    private Long categoryId;

    // Danh sách ảnh
    private List<ProductImageResponseDTO> images;

    // Nhóm thông số kỹ thuật theo nhóm
    private Map<String, List<SpecificationResponseDTO>> specificationGroups;
}
