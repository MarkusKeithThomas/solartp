package ecommerce.project.dto;

import lombok.Data;

@Data
public class ProductImageDTO {
    private String imageUrl;
    private String altText;
    private Boolean isThumbnail;
    private Integer displayOrder;
}
