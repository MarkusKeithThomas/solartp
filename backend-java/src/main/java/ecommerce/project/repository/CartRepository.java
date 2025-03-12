package ecommerce.project.repository;

import ecommerce.project.entity.CartEntity;
import ecommerce.project.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<CartEntity, Integer> {
    Optional<CartEntity> findCartByUserID(UserEntity userID);
    void deleteByUserID(UserEntity user);

}
