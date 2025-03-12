package ecommerce.project.repository;


import ecommerce.project.entity.CartDetailEntity;
import ecommerce.project.entity.CartEntity;
import ecommerce.project.entity.ProductDetailEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartDetailRepository extends JpaRepository<CartDetailEntity, Integer> {
    Optional<CartDetailEntity> findByCartDetailIDAndCartProductDetailID(CartEntity cart, ProductDetailEntity productDetail);
    List<CartDetailEntity> findByCartDetailID(CartEntity cart);
}
