package ecommerce.project.repository;

import ecommerce.project.entity.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    boolean existsBySlug(String slug);
    boolean existsBySkuProduct(String sku);
    Page<ProductEntity> findByIsActiveTrue(Pageable pageable);
    Optional<ProductEntity> findByIdAndIsActiveTrue(Long id);

    @Modifying
    @Transactional
    @Query("UPDATE ProductEntity p SET p.countView = p.countView + :views WHERE p.id = :productId")
    void incrementCountView(@Param("productId") Long productId, @Param("views") Long views);

    @Modifying
    @Query("UPDATE ProductEntity p SET p.stockQuantity = p.stockQuantity - :quantity WHERE p.id = :productId AND p.stockQuantity >= :quantity")
    int decreaseStock(@Param("productId") Long productId, @Param("quantity") Integer quantity);
}