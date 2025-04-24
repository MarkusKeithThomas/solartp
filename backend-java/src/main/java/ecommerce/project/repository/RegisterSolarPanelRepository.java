package ecommerce.project.repository;

import ecommerce.project.entity.RegisterSolarPanelEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegisterSolarPanelRepository extends JpaRepository<RegisterSolarPanelEntity, Integer> {
    List<RegisterSolarPanelEntity >findAllByOrderByCreatedAtDesc();
}