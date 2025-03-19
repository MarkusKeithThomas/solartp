package ecommerce.project.service;

import java.util.Map;

public interface ArticleService {
    Map<String, Object> getAllArticle(Long lastId,int limit);
}
