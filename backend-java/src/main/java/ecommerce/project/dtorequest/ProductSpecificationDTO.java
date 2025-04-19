package ecommerce.project.dtorequest;

import lombok.Data;

@Data
public class ProductSpecificationDTO {
    private Long id;
    private String sku;
    private String specGroup;
    private String name;
    private String value;
    private Integer displayOrder;
}
