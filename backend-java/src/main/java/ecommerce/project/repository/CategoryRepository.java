package ecommerce.project.repository;

import ecommerce.project.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<CategoryEntity,Integer> {
    Optional<CategoryEntity> findById(Long id);
    boolean existsById(Long id);
}
