package ecommerce.project.service;

import ecommerce.project.dtoresponse.ArticleResponseDTO;

import java.util.Map;

public interface ArticleService {
    Map<String, Object> getAllArticle(Long lastId,int limit);
    ArticleResponseDTO getBySlug(String slug);
    Map<String, Object> getAllArticleNoCache(Long lastId,int limit);


}
