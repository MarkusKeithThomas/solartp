package ecommerce.project.service;

import ecommerce.project.dtoresponse.ProductImageResponseDTO;
import ecommerce.project.dtoresponse.ProductResponseDTO;
import ecommerce.project.dtoresponse.SpecificationResponseDTO;
import ecommerce.project.entity.ProductEntity;
import ecommerce.project.entity.ProductImageEntity;
import ecommerce.project.entity.ProductSpecificationEntity;
import ecommerce.project.repository.ProductImageRepository;
import ecommerce.project.repository.ProductRepository;
import ecommerce.project.repository.ProductSpecificationRepository;
import ecommerce.project.utils.ProductMapperUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
public class ProductRedisServiceImpl implements ProductRedisService {

    private final ProductRepository productRepository;
    private final ProductSpecificationRepository productSpecificationRepository;
    private final ProductImageRepository productImageRepository;
    @Qualifier("productAllRedisTemplate")
    private final RedisTemplate<String, List<ProductResponseDTO>> productRedisTemplate;
    private final ProductMapperUtils productMapperUtils;

    private static final String REDIS_KEY = "product_map";

    public ProductRedisServiceImpl(ProductRepository productRepository,
                                   ProductSpecificationRepository productSpecificationRepository,
                                   ProductImageRepository productImageRepository,
                                   RedisTemplate<String, List<ProductResponseDTO>> productRedisTemplate,
                                   ProductMapperUtils productMapperUtils
    ) {
        this.productRepository = productRepository;
        this.productSpecificationRepository = productSpecificationRepository;
        this.productImageRepository = productImageRepository;
        this.productRedisTemplate = productRedisTemplate;
        this.productMapperUtils = productMapperUtils;
    }

    @Override
    public List<ProductResponseDTO> getAllProductsFromRedis() {
        return (List<ProductResponseDTO>) productRedisTemplate.opsForValue().get(REDIS_KEY);
    }



    @Override
    public void syncAllActiveProductsToRedis() {
        List<ProductEntity> allProducts = productRepository.findByIsActiveTrue(); // không phân trang

        List<ProductResponseDTO> productDTOs = allProducts.stream().map(product -> {
            ProductResponseDTO dto = productMapperUtils.toProductResponseDTO(product);

            List<ProductImageEntity> imageEntities = productImageRepository.findByProductIdOrderByDisplayOrderAsc(product.getId());
            List<ProductImageResponseDTO> imageDTOs = imageEntities.stream()
                    .map(productMapperUtils::toProductImageResponseDTO)
                    .toList();
            dto.setImages(imageDTOs);

            List<ProductSpecificationEntity> specs = productSpecificationRepository.findByProductIdOrderByDisplayOrderAsc(product.getId());
            List<SpecificationResponseDTO> specDTOs = specs.stream()
                    .map(productMapperUtils::toSpecificationResponseDTO)
                    .toList();
            Map<String, List<SpecificationResponseDTO>> groupedSpecs = specDTOs.stream()
                    .collect(Collectors.groupingBy(SpecificationResponseDTO::getSpecGroup));
            dto.setSpecificationGroups(groupedSpecs);

            return dto;
        }).toList();

        productRedisTemplate.opsForValue().set(REDIS_KEY,productDTOs);

        log.info("✅ Synced ProductRedisServiceImpl " + productDTOs.size() + " products to Redis.");
    }
}
