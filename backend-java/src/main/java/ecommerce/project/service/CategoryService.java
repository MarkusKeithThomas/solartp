package ecommerce.project.service;

import ecommerce.project.dto.CategoryDTO;

import java.util.List;

public interface CategoryService {
    // CREATE
    boolean createCategory(CategoryDTO dto);

    // READ
    List<CategoryDTO> getAllCategories();

    // UPDATE
    CategoryDTO updateCategory(Long id, CategoryDTO dto);

    // DELETE
    void deleteCategory(Long id);
}
