package ecommerce.project.service;

import ecommerce.project.entity.ArticleEntity;
import ecommerce.project.exception.ArticleGetException;
import ecommerce.project.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ArticleServiceImpl implements ArticleService{
    @Autowired
    private ArticleRepository articleRepository;

    @Override
    public Map<String, Object> getAllArticle(Long lastId, int  limit) {
        Pageable pageable = PageRequest.of(0, limit);


        List<ArticleEntity> articles;
        if (limit == 0) {
            throw new ArticleGetException("Chỉ số bài viết và giới hạn bài viết không được 0.");
        } else if (lastId == 0) {
            articles = articleRepository.findAllByOrderByIdDesc(pageable);
        } else{
            articles = articleRepository.findByIdLessThanOrderByIdDesc(lastId,pageable);
        }
        // Lấy ID đầu tiên của danh sách để làm lastId cho lần load tiếp theo
        Long newLastId = articles.isEmpty() ? null : (long) articles.get(articles.size() - 1).getId();

        Map<String, Object> response = new HashMap<>();
        response.put("articles", articles);
        response.put("lastId", newLastId);
        return response;
    }
}
