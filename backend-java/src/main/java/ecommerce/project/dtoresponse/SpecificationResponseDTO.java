package ecommerce.project.dtoresponse;


import lombok.Data;

@Data
public class SpecificationResponseDTO {
    private String specGroup;
    private String name;
    private String value;
    private Integer displayOrder;
}
