package ecommerce.project.service;

import java.util.Map;

public interface ArticleCacheService {
    Map<String, Object> getArticlesFromCache(Long lastId, int limit);
}
