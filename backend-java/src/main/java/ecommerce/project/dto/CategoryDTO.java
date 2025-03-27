package ecommerce.project.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CategoryDTO {
    private long id;
    @NotBlank(message = "Tên danh mục không được để trống")
    private String name;
    private String slug;
    @NotBlank(message = "Mô tả không thể để trống")
    private String description;
}
