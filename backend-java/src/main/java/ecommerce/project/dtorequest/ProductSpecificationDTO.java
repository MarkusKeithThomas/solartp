package ecommerce.project.dtorequest;

import lombok.Data;

@Data
public class ProductSpecificationDTO {
    private long id;
    private String sku;
    private String specGroup;
    private String name;
    private String value;
    private Integer displayOrder;
}
