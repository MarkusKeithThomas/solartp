package ecommerce.project.repository;

import ecommerce.project.entity.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    boolean existsBySlug(String slug);
    boolean existsBySkuProduct(String sku);
    Page<ProductEntity> findByIsActiveTrue(Pageable pageable);
    Optional<ProductEntity> findByIdAndIsActiveTrue(Long id);
}