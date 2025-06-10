package ecommerce.project.service;

import ecommerce.project.dtoresponse.ArticleResponseDTO;

import java.util.List;
import java.util.Map;

public interface ArticleCacheService {
    Map<String, Object> getArticlesFromCache(Long lastId, int limit);
}
