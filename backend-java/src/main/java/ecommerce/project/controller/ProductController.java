package ecommerce.project.controller;

import ecommerce.project.baseresponse.BaseResponse;
import ecommerce.project.baseresponse.CustomPageResponse;
import ecommerce.project.dtorequest.ProductDTO;
import ecommerce.project.dtoresponse.ProductResponseDTO;
import ecommerce.project.service.ProductExcelService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductExcelService productService;

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
        return ResponseEntity.ok(new BaseResponse(200, "Xoá sản phẩm thành công (xoá mềm)", null));
    }
}
