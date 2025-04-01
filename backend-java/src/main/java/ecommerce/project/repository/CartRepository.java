package ecommerce.project.repository;

import ecommerce.project.entity.CartEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<CartEntity, Long> {
    Optional<CartEntity> findByUserId(Integer userId);
    Optional<CartEntity> findByUuidToken(String uuidToken);
}