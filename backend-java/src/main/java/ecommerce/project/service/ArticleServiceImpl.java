package ecommerce.project.service;

import ecommerce.project.dtoresponse.ArticleResponseDTO;
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
    @Override
    public ArticleResponseDTO getBySlug(String slug) {
        ArticleEntity entity = articleRepository.findBySlugTitle(slug)
                .orElseThrow(() -> new ArticleGetException("Không tìm thấy bài viết với slug: " + slug));

        return mapToDTO(entity);
    }

    private ArticleResponseDTO mapToDTO(ArticleEntity entity) {
        ArticleResponseDTO dto = new ArticleResponseDTO();
        dto.setId((long) entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setSlugTitle(entity.getSlugTitle());
        dto.setHeader1(entity.getHeader1());
        dto.setContent11(entity.getContent11());
        dto.setContent12(entity.getContent12());
        dto.setHeader2(entity.getHeader2());
        dto.setContent21(entity.getContent21());
        dto.setContent22(entity.getContent22());
        dto.setHeader3(entity.getHeader3());
        dto.setContent31(entity.getContent31());
        dto.setContent32(entity.getContent32());
        dto.setHeader4(entity.getHeader4());
        dto.setContent41(entity.getContent41());
        dto.setContent42(entity.getContent42());
        dto.setImage1Url(entity.getImage1Url());
        dto.setAltImage1(entity.getAltImage1());
        dto.setImage2Url(entity.getImage2Url());
        dto.setAltImage2(entity.getAltImage2());
        dto.setDateCreate(entity.getDateCreate());
        return dto;
    }
}
