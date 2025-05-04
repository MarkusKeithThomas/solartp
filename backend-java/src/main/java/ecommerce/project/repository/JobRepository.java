package ecommerce.project.repository;

import ecommerce.project.dtoresponse.JobResponse;
import ecommerce.project.entity.JobEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends JpaRepository<JobEntity,Integer> {
    JobEntity findBySlug(String slug);
}
