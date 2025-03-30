package ecommerce.project.dtorequest;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ProductDTO {
    private long id;
    private Long category_id;
    private String sku_product;
    private String wattage;
    private String name;
    private String slug;
    private BigDecimal newPrice;
    private BigDecimal oldPrice;
    private int stock_quantity;
    private int sold_quantity;
    private String description;
    private boolean isActive;

    // Dữ liệu đi kèm khi thêm mới sản phẩm
    private List<ProductImageDTO> images;
    private List<ProductSpecificationDTO> specifications;
}
