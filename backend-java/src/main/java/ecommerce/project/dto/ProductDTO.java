package ecommerce.project.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ProductDTO {
    private long id;
    private String name;
    private String slug;
    private BigDecimal newPrice;
    private BigDecimal oldPrice;
    private Long categoryId;

    // Dữ liệu đi kèm khi thêm mới sản phẩm
    private List<ProductImageDTO> images;
    private List<ProductVariantDTO> variants;
    private List<ProductSpecificationDTO> specifications;
}
