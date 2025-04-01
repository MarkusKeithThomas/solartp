package ecommerce.project.dtorequest;

import lombok.Data;

@Data
public class ProductImageDTO {
    private long id;
    private String imageUrl;
    private String altText;
    private Boolean isThumbnail;
    private Integer displayOrder;
}
