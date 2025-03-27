package ecommerce.project.dto;

import lombok.Data;

@Data
public class ProductSpecificationDTO {
    private String sku;
    private String specGroup;
    private String name;
    private String value;
    private Integer displayOrder;
}
