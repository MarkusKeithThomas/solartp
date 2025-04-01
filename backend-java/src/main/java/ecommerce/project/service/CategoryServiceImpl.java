package ecommerce.project.service;

import ecommerce.project.dtorequest.CategoryDTO;
import ecommerce.project.entity.CategoryEntity;
import ecommerce.project.exception.CategoryNotFoundException;
import ecommerce.project.repository.CategoryRepository;
import ecommerce.project.utils.StringUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{
    private final CategoryRepository categoryRepository;
    @Autowired
    private final StringUtil stringUtil;



    @Override
    public boolean createCategory(CategoryDTO dto) {
        CategoryEntity entity = mapToEntity(dto);
        categoryRepository.save(entity);
        return true;
    }

    @Override
    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CategoryDTO updateCategory(Long id, CategoryDTO dto) {
        CategoryEntity entity = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));

        entity.setName(dto.getName());
        entity.setSlug(stringUtil.toSlug(dto.getName()));
        entity.setDescription(dto.getDescription());

        CategoryEntity updated = categoryRepository.save(entity);
        return mapToResponseDTO(updated);    }

    @Override
    public void deleteCategory(Long id) {
        if (!categoryRepository.existsById(Math.toIntExact(id))) {
            throw new CategoryNotFoundException(id);
        }
        categoryRepository.deleteById(Math.toIntExact((id)));

    }
    // --- MAPPER ---

    private CategoryEntity mapToEntity(CategoryDTO dto) {
        CategoryEntity entity = new CategoryEntity();
        entity.setName(dto.getName());
        entity.setSlug(stringUtil.toSlug(dto.getName()));
        entity.setDescription(dto.getDescription());
        return entity;
    }

    private CategoryDTO mapToResponseDTO(CategoryEntity entity) {
        CategoryDTO dto = new CategoryDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setSlug(entity.getSlug());
        dto.setDescription(entity.getDescription());
        return dto;
    }

}
