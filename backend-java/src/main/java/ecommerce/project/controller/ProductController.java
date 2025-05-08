package ecommerce.project.controller;

import ecommerce.project.baseresponse.BaseResponse;
import ecommerce.project.baseresponse.CustomPageResponse;
import ecommerce.project.dtorequest.ProductDTO;
import ecommerce.project.dtorequest.ProductImageDTO;
import ecommerce.project.dtorequest.ProductSpecificationDTO;
import ecommerce.project.dtoresponse.ProductResponseDTO;
import ecommerce.project.service.ProductExcelService;
import ecommerce.project.service.ProductRedisService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
@Slf4j
@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductExcelService productService;
    private final ProductRedisService productRedisService;

    @GetMapping("/getAllProductByRedis")
    public ResponseEntity<?> getAllProductByRedis(){
        List<ProductResponseDTO> list = productRedisService.getAllProductsFromRedis();
        return ResponseEntity.ok(new BaseResponse(200,"Lấy toàn bộ danh sách thành công", list));
    }
    @GetMapping("/getAllProductByAdmin")
    public ResponseEntity<?> getAllProductByAdmin(){
        List<ProductResponseDTO> list = productRedisService.getAllProductsFromAdmin();
        return ResponseEntity.ok(new BaseResponse(200,"Lấy toàn bộ danh sách thành công", list));
    }

    @PostMapping("/add")
    public ResponseEntity<?> createProduct(@RequestParam("fileProduct") MultipartFile file) {
        if (file.isEmpty() || !file.getOriginalFilename().endsWith(".xlsx")) {
            return ResponseEntity.badRequest().body("Vui lòng tải lên một file Excel hợp lệ.");
        }
        List<String> created = productService.createProduct(file);
        BaseResponse response = new BaseResponse(200, "Tạo sản phẩm thành công", created);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id,
                                                      @RequestBody ProductDTO productDTO) {
        ProductResponseDTO updated = productService.updateProduct(id, productDTO);
        return ResponseEntity.ok(new BaseResponse(200, "Cập nhật sản phẩm thành công", updated));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateProductFields(
            @PathVariable Long id,
            @RequestBody Map<String, Object> updates) {
        ProductResponseDTO updated = productService.updateBasicFields(id, updates);
        return ResponseEntity.ok(new BaseResponse(200,"Sản phẩm cập nhật thành công",updated));
    }

    @PutMapping("/{id}/images")
    public ResponseEntity<?> updateProductImages(
            @PathVariable Long id,
            @RequestBody List<ProductImageDTO> images) {
        productService.updateImages(id, images);
        return ResponseEntity.ok(new BaseResponse(200,"✅ Ảnh đã được cập nhật",images));
    }

    @PutMapping("/{id}/specifications")
    public ResponseEntity<?> updateProductSpecifications(
            @PathVariable Long id,
            @RequestBody Map<String, List<ProductSpecificationDTO>> specificationGroups) {
        productService.updateSpecifications(id, specificationGroups);
        return ResponseEntity.ok(new BaseResponse(200,"✅ Thông số đã được cập nhật",specificationGroups));
    }


    @GetMapping("/getAllProduct")
        public ResponseEntity<BaseResponse> getAllProducts(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "4") int size) {

    Pageable pageable = PageRequest.of(page, size);
    CustomPageResponse<ProductResponseDTO> products = productService.getAllProducts(pageable);
    return ResponseEntity.ok(new BaseResponse(200, "Lấy danh sách sản phẩm thành công", products));
}
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BaseResponse> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        log.warn("🗑️ Admin xoá sản phẩm ID: {}", id);
        return ResponseEntity.ok(new BaseResponse(200, "Xoá sản phẩm thành công (xoá mềm)", null));
    }

    @GetMapping("/details/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id, HttpServletRequest request) {
        ProductResponseDTO product = productService.getProductDetailById(id,request);
        return ResponseEntity.ok(new BaseResponse(200,"Đã lấy sản phẩm thành công.",product));
    }


}
