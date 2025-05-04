package ecommerce.project.repository;

import ecommerce.project.entity.JobApplicationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobFormRepository extends JpaRepository<JobApplicationEntity, Integer> {
}
