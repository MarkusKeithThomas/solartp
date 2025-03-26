package ecommerce.project.repository;

import ecommerce.project.entity.ProductVariantEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductVariantRepository extends JpaRepository<ProductVariantEntity, Long> {
    List<ProductVariantEntity> findByProductId(Long productId);
    boolean existsBySkuCode(String skuCode);
}