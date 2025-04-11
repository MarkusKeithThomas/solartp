package ecommerce.project.repository;

import ecommerce.project.entity.VoucherEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VoucherRepository extends JpaRepository<VoucherEntity, Long> {
    Optional<VoucherEntity> findByCodeIgnoreCase(String code);
}
