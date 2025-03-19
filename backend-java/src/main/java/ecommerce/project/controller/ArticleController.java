package ecommerce.project.controller;

import ecommerce.project.baseresponse.BaseResponse;
import ecommerce.project.entity.ArticleEntity;
import ecommerce.project.repository.ArticleRepository;
import ecommerce.project.service.CSVServices;
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

    @Qualifier("CSVServicesImpl")
    @Autowired
    private CSVServices csvServices;
    @Autowired
    private ArticleRepository articleRepository;


    @PostMapping("/upload-csv")
    @CacheEvict(value = "articles", allEntries = true) // Xóa toàn bộ cache
    public ResponseEntity<?> uploadCSV(@RequestParam("file") MultipartFile file,
                                       @RequestParam("listimage") List<MultipartFile> images) {
        if (file.isEmpty() || !file.getOriginalFilename().endsWith(".csv")) {
            return ResponseEntity.badRequest().body("Vui lòng tải lên một file CSV hợp lệ.");
        }
        csvServices.saveCSVToDatabase(file,images);
        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setCode(200);
        baseResponse.setMessage("Dữ liệu từ CSV đã được nhập vào MySQL thành công.");
        baseResponse.setData(null);
        return ResponseEntity.ok(baseResponse);
    }
    @GetMapping("/list")
    @Cacheable(value = "articles", key = "#lastId") // Cache dữ liệu theo lastId
    public ResponseEntity<?> getArticles(@RequestParam(required = false) Long lastId,
                                         @RequestParam(defaultValue = "10") int limit) {
        List<ArticleEntity> articles;
        if (lastId == null) {
            articles = articleRepository.findTopByOrderByIdDesc(limit);
        } else {
            articles = articleRepository.findByIdLessThanOrderByIdDesc(lastId, limit);
        }

        // Lấy ID đầu tiên của danh sách để làm lastId cho lần load tiếp theo
        Long newLastId = articles.isEmpty() ? null : Long.valueOf(articles.get(0).getId());

        Map<String, Object> response = new HashMap<>();
        response.put("articles", articles);
        response.put("lastId", newLastId);

        return ResponseEntity.ok(response);
    }

}
