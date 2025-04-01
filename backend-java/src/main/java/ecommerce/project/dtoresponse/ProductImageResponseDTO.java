package ecommerce.project.dtoresponse;

import lombok.Data;

@Data
public class ProductImageResponseDTO {
    private String imageUrl;
    private String altText;
    private Boolean isThumbnail;
    private Integer displayOrder;
}
