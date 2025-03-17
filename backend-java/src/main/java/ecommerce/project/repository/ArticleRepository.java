package ecommerce.project.repository;

import ecommerce.project.entity.ArticleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<ArticleEntity,Integer> {
    // Lấy danh sách bài viết mới nhất theo số lượng giới hạn
    @Query("SELECT a FROM ArticleEntity a ORDER BY a.id DESC")
    List<ArticleEntity> findTopByOrderByIdDesc(@Param("limit") int limit);

    // Lấy danh sách bài viết có id nhỏ hơn lastId để Load More
    @Query("SELECT a FROM ArticleEntity a WHERE a.id < :lastId ORDER BY a.id DESC")
    List<ArticleEntity> findByIdLessThanOrderByIdDesc(@Param("lastId") Long lastId, @Param("limit") int limit);
}
