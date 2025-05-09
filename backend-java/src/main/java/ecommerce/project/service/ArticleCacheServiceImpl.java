package ecommerce.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ArticleCacheServiceImpl implements ArticleCacheService {
    @Autowired
    private ArticleService articleService;

    @Override
    @Cacheable(value = "articles", key = "#lastId")
    public Map<String, Object> getArticlesFromCache(Long lastId, int limit) {
        return articleService.getAllArticle(lastId,limit);
    }
}
