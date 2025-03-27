//package ecommerce.project.service;
//
//import ecommerce.project.dto.ProductDTO;
//import ecommerce.project.entity.*;
//import ecommerce.project.exception.CategoryNotFoundException;
//import ecommerce.project.exception.ProductNotFoundException;
//import ecommerce.project.repository.*;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//import java.util.stream.Collectors;
//
//@Service
//@RequiredArgsConstructor
//public class ProductServiceDTOImpl implements ProductServiceDTO {
//
//    private final ProductRepository productRepository;
//    private final CategoryRepository categoryRepository;
//    private final ProductImageRepository productImageRepository;
//    private final ProductVariantRepository productVariantRepository;
//    private final ProductSpecificationRepository productSpecificationRepository;
//
//    @Override
//    public ProductDTO createProduct(ProductDTO productDTO) {
//        ProductEntity product = new ProductEntity();
//        product.setName(productDTO.getName());
//        product.setSlug(productDTO.getSlug());
//        product.setNewPrice(productDTO.getNewPrice());
//        product.setOldPrice(productDTO.getOldPrice());
//
//        if (productDTO.getSku_product() != null) {
//            CategoryEntity category = categoryRepository.findBy(productDTO.getSku_product())
//                    .orElseThrow(() -> new CategoryNotFoundException(productDTO.getCategoryId()));
//            product.setCategory(category);
//        }
//
//        ProductEntity savedProduct = productRepository.save(product);
//
//        // Save images
//        if (productDTO.getImages() != null) {
//            List<ProductImageEntity> imageEntities = productDTO.getImages().stream().map(dto -> {
//                ProductImageEntity img = new ProductImageEntity();
//                img.setImageUrl(dto.getImageUrl());
//                img.setAltText(dto.getAltText());
//                img.setIsThumbnail(dto.getIsThumbnail());
//                img.setDisplayOrder(dto.getDisplayOrder());
//                img.setProduct(savedProduct);
//                return img;
//            }).collect(Collectors.toList());
//            productImageRepository.saveAll(imageEntities);
//        }
//
//        // Save variants
//        if (productDTO.getVariants() != null) {
//            List<ProductVariantEntity> variantEntities = productDTO.getVariants().stream().map(dto -> {
//                ProductVariantEntity v = new ProductVariantEntity();
//                v.setSkuCode(dto.getSkuCode());
//                v.setName(dto.getName());
//                v.setWattProduct(dto.getWattProduct());
//                v.setPrice(dto.getPrice());
//                v.setStockQuantity(dto.getStockQuantity());
//                v.setNote(dto.getNote());
//                v.setProduct(savedProduct);
//                return v;
//            }).collect(Collectors.toList());
//            productVariantRepository.saveAll(variantEntities);
//        }
//
//        // Save specifications
//        if (productDTO.getSpecifications() != null) {
//            List<ProductSpecificationEntity> specEntities = productDTO.getSpecifications().stream().map(dto -> {
//                ProductSpecificationEntity spec = new ProductSpecificationEntity();
//                spec.setSpecGroup(dto.getSpecGroup());
//                spec.setName(dto.getName());
//                spec.setValue(dto.getValue());
//                spec.setDisplayOrder(dto.getDisplayOrder());
//                spec.setProduct(savedProduct);
//                return spec;
//            }).collect(Collectors.toList());
//            productSpecificationRepository.saveAll(specEntities);
//        }
//
//        productDTO.setId(savedProduct.getId());
//        return productDTO;
//    }
//
//    @Override
//    public ProductDTO updateProduct(Long id, ProductDTO productDTO) {
//        ProductEntity product = productRepository.findById(id)
//                .orElseThrow(() -> new ProductNotFoundException(id));
//
//        product.setName(productDTO.getName());
//        product.setSlug(productDTO.getSlug());
//        product.setNewPrice(productDTO.getNewPrice());
//        product.setOldPrice(productDTO.getOldPrice());
//
//        if (productDTO.getCategoryId() != null) {
//            CategoryEntity category = categoryRepository.findById(productDTO.getCategoryId())
//                    .orElseThrow(() -> new CategoryNotFoundException(productDTO.getCategoryId()));
//            product.setCategory(category);
//        }
//
//        productRepository.save(product);
//        productDTO.setId(product.getId());
//        return productDTO;
//    }
//
//    @Override
//    public Optional<ProductDTO> getProductById(Long id) {
//        return productRepository.findById(id).map(product -> {
//            ProductDTO dto = new ProductDTO();
//            dto.setId(product.getId());
//            dto.setName(product.getName());
//            dto.setSlug(product.getSlug());
//            dto.setNewPrice(product.getNewPrice());
//            dto.setOldPrice(product.getOldPrice());
//            dto.setCategoryId(product.getCategory() != null ? product.getCategory().getId() : null);
//            return dto;
//        });
//    }
//
//    @Override
//    public List<ProductDTO> getAllProducts() {
//        return productRepository.findAll().stream().map(product -> {
//            ProductDTO dto = new ProductDTO();
//            dto.setId(product.getId());
//            dto.setName(product.getName());
//            dto.setSlug(product.getSlug());
//            dto.setNewPrice(product.getNewPrice());
//            dto.setOldPrice(product.getOldPrice());
//            dto.setCategoryId(product.getCategory() != null ? product.getCategory().getId() : null);
//            return dto;
//        }).collect(Collectors.toList());
//    }
//
//    @Override
//    public void deleteProduct(Long id) {
//        if (!productRepository.existsById(id)) {
//            throw new ProductNotFoundException(id);
//        }
//        productRepository.deleteById(id);
//    }
//}
