package ecommerce.project.dtoresponse;

import lombok.Data;

@Data
public class ProductImageResponseDTO {
    private long id;
    private String imageUrl;
    private String altText;
    private Boolean isThumbnail;
    private Integer displayOrder;
}
