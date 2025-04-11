package ecommerce.project.repository;

import ecommerce.project.entity.CartEntity;
import ecommerce.project.entity.CartItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItemEntity, Long> {
    List<CartItemEntity> findByCartId(Long cartId);
    void deleteAllByCartId(Long cart);
}