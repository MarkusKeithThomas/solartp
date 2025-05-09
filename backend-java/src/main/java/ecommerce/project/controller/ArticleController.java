package ecommerce.project.controller;

import ecommerce.project.baseresponse.BaseResponse;
import ecommerce.project.dtoresponse.ArticleResponseDTO;
import ecommerce.project.service.ArticleCacheService;
import ecommerce.project.service.ArticleService;
import ecommerce.project.service.ExcelServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/bai-viet")
public class ArticleController {

    @Autowired
    private ExcelServices excelServices;
    @Autowired
    private ArticleService articleService;
    @Autowired
    private ArticleCacheService articleCacheService;


    @PostMapping("/upload-excel")
    @CacheEvict(value = "articles", allEntries = true) // Xóa toàn bộ cache
    public ResponseEntity<?> uploadCSV(@RequestParam("file") MultipartFile file,
                                       @RequestParam("listimage") List<MultipartFile> images) {
        if (file.isEmpty() || !file.getOriginalFilename().endsWith(".xlsx")) {
            return ResponseEntity.badRequest().body("Vui lòng tải lên một file Excel hợp lệ.");
        }
        excelServices.saveExcelToDatabase(file,images);
        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setCode(200);
        baseResponse.setMessage("Dữ liệu từ CSV đã được nhập vào MySQL thành công.");
        baseResponse.setData(null);
        return ResponseEntity.ok(baseResponse);
    }


    @GetMapping("/list")
    public ResponseEntity<?> getArticles(@RequestParam(required = false) Long lastId,
                                         @RequestParam(defaultValue = "10") int limit) {
        Map<String, Object> response = articleCacheService.getArticlesFromCache(lastId,limit);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<?> getArticleBySlug(@PathVariable String slug) {
        ArticleResponseDTO article = articleService.getBySlug(slug);
        return ResponseEntity.ok(new BaseResponse(200,"Lấy bài viết thành công",article));
    }

}
