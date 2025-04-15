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
import ecommerce.project.utils.RedisKeyPrefix;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
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
        String redisKey = RedisKeyPrefix.REDIS_KEY_GET_ALL_PRODUCT;

        // 1. Thử lấy từ Redis
        List<ProductResponseDTO> cachedProducts = (List<ProductResponseDTO>) productRedisTemplate.opsForValue().get(redisKey);

        if (cachedProducts != null && !cachedProducts.isEmpty()) {
            log.info("✅ Lấy danh sách sản phẩm từ Redis (key: {})", redisKey);
            return cachedProducts;
        }

        log.warn("⚠️ Không tìm thấy dữ liệu trong Redis. Đang lấy từ MySQL và cache lại...");

        // 2. Nếu không có trong Redis → Lấy từ MySQL
        List<ProductEntity> allProducts = productRepository.findByIsActiveTrue(); // Không phân trang

        List<ProductResponseDTO> dtoList = allProducts.stream().map(product -> {
            ProductResponseDTO dto = productMapperUtils.toProductResponseDTO(product);

            // Ảnh
            List<ProductImageEntity> imageEntities = productImageRepository.findByProductIdOrderByDisplayOrderAsc(product.getId());
            List<ProductImageResponseDTO> imageDTOs = imageEntities.stream()
                    .map(productMapperUtils::toProductImageResponseDTO)
                    .toList();
            dto.setImages(imageDTOs);

            // Thông số kỹ thuật
            List<ProductSpecificationEntity> specs = productSpecificationRepository.findByProductIdOrderByDisplayOrderAsc(product.getId());
            List<SpecificationResponseDTO> specDTOs = specs.stream()
                    .map(productMapperUtils::toSpecificationResponseDTO)
                    .toList();
            Map<String, List<SpecificationResponseDTO>> groupedSpecs = specDTOs.stream()
                    .collect(Collectors.groupingBy(SpecificationResponseDTO::getSpecGroup));
            dto.setSpecificationGroups(groupedSpecs);

            return dto;
        }).toList();

        // 3. Lưu vào Redis để cache
        productRedisTemplate.opsForValue().set(redisKey, dtoList, Duration.ofMinutes(15));
        log.info("📝 Đã cache lại danh sách sản phẩm vào Redis. TTL: 15 phút");

        return dtoList;
    }



    @Override
    public void syncAllActiveProductsToRedis() {

        List<ProductEntity> allProducts = productRepository.findByIsActiveTrue(); // không phân trang
        if (allProducts.isEmpty()) {
            log.warn("❌ Không có sản phẩm nào active để sync lên Redis");
            return;
        }

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

        productRedisTemplate.opsForValue().set(RedisKeyPrefix.REDIS_KEY_GET_ALL_PRODUCT,productDTOs);

        log.info("✅ Synced ProductRedisServiceImpl " + productDTOs.size() + " products to Redis.");
    }
}
