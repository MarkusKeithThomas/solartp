package ecommerce.project.repository;

import ecommerce.project.entity.ArticleEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<ArticleEntity,Integer> {
    List<ArticleEntity> findByIdLessThanOrderByIdDesc(Long lastId, Pageable pageable);
    List<ArticleEntity> findAllByOrderByIdDesc(Pageable pageable);



}
