package ecommerce.project.utils;

import ecommerce.project.dtorequest.ProductDTO;
import ecommerce.project.dtorequest.ProductImageDTO;
import ecommerce.project.dtorequest.ProductSpecificationDTO;
import ecommerce.project.dtoresponse.ProductImageResponseDTO;
import ecommerce.project.dtoresponse.ProductResponseDTO;
import ecommerce.project.dtoresponse.SpecificationResponseDTO;
import ecommerce.project.entity.ProductEntity;
import ecommerce.project.entity.ProductImageEntity;
import ecommerce.project.entity.ProductSpecificationEntity;
import ecommerce.project.exception.UploadExcelException;
import ecommerce.project.repository.CategoryRepository;
import ecommerce.project.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProductMapperUtils {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;


    public ProductResponseDTO toProductResponseDTO(ProductEntity entity) {
        ProductResponseDTO dto = new ProductResponseDTO();
        dto.setId(entity.getId());
        dto.setSkuProduct(entity.getSkuProduct());
        dto.setName(entity.getName());
        dto.setSlug(entity.getSlug());
        dto.setDescription(entity.getDescription());
        dto.setNewPrice(entity.getNewPrice());
        dto.setOldPrice(entity.getOldPrice());
        dto.setCategoryId(entity.getCategoryId());
        dto.setStockQuantity(entity.getStockQuantity());
        dto.setSoldQuantity(entity.getSoldQuantity());
        dto.setWattage(entity.getWattage());
        dto.setIsActive(entity.getIsActive());
        return dto;
    }

    public ProductImageResponseDTO toProductImageResponseDTO(ProductImageEntity entity) {
        ProductImageResponseDTO dto = new ProductImageResponseDTO();
        dto.setId(entity.getId());
        dto.setImageUrl(entity.getImageUrl());
        dto.setAltText(entity.getAltText());
        dto.setIsThumbnail(entity.getIsThumbnail());
        dto.setDisplayOrder(entity.getDisplayOrder());
        return dto;
    }

    public SpecificationResponseDTO toSpecificationResponseDTO(ProductSpecificationEntity entity) {
        SpecificationResponseDTO dto = new SpecificationResponseDTO();
        dto.setId(entity.getId());
        dto.setSpecGroup(entity.getSpecGroup());
        dto.setName(entity.getName());
        dto.setValue(entity.getValue());
        dto.setDisplayOrder(entity.getDisplayOrder());
        return dto;
    }

    public ProductEntity toProductEntity(ProductDTO dto) {
        if (productRepository.existsBySkuProduct(dto.getSku_product())) {
            throw new UploadExcelException("SKU đã tồn tại: " + dto.getSku_product());
        }
        if (!categoryRepository.existsById(dto.getCategory_id())) {
            throw new UploadExcelException("Không tìm thấy category với ID: " + dto.getCategory_id());
        }
        ProductEntity entity = new ProductEntity();
        entity.setSkuProduct(dto.getSku_product());
        entity.setName(dto.getName());
        entity.setSlug(dto.getSlug());
        entity.setNewPrice(dto.getNewPrice());
        entity.setOldPrice(dto.getOldPrice());
        entity.setCategoryId(dto.getCategory_id());
        entity.setStockQuantity(dto.getStock_quantity());
        entity.setWattage(dto.getWattage());
        entity.setDescription(dto.getDescription());
        return entity;
    }

    public ProductImageEntity toImageEntity(ProductImageDTO dto, long productId) {
        ProductImageEntity entity = new ProductImageEntity();
        entity.setImageUrl(dto.getImageUrl());
        entity.setProductId(productId);
        entity.setAltText(dto.getAltText());
        entity.setIsThumbnail(dto.getIsThumbnail() != null ? dto.getIsThumbnail() : false);
        entity.setDisplayOrder(dto.getDisplayOrder());
        return entity;
    }

    public ProductSpecificationEntity toSpecificationEntity(ProductSpecificationDTO dto, long productId) {
        ProductSpecificationEntity entity = new ProductSpecificationEntity();
        entity.setProductId(productId);
        entity.setSpecGroup(dto.getSpecGroup());
        entity.setName(dto.getName());
        entity.setValue(dto.getValue());
        entity.setDisplayOrder(dto.getDisplayOrder());
        return entity;
    }
}