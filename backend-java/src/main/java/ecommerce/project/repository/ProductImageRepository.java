package ecommerce.project.repository;

import ecommerce.project.entity.ProductImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImageEntity, Long> {
    List<ProductImageEntity> findByProductIdOrderByDisplayOrderAsc(Long productId);
    void deleteByProductId(Long productId);
    List<ProductImageEntity> findByProductIdIn(Collection<Long> productId);

}