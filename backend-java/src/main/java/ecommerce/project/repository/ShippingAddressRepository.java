package ecommerce.project.repository;

import ecommerce.project.entity.ShippingAddressEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ShippingAddressRepository extends JpaRepository<ShippingAddressEntity, Long> {
    Optional<ShippingAddressEntity> findByOrderId(Long orderId);
}
