package ecommerce.project.repository;

import ecommerce.project.entity.ProductSpecificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductSpecificationRepository extends JpaRepository<ProductSpecificationEntity, Long> {
    List<ProductSpecificationEntity> findByProductIdOrderByDisplayOrderAsc(Long productId);
    void deleteByProductId(Long productId);
}