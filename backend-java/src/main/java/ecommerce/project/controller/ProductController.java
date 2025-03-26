package ecommerce.project.controller;

import ecommerce.project.baseresponse.BaseResponse;
import ecommerce.project.dto.ProductDTO;
import ecommerce.project.service.ProductServiceDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductServiceDTO productService;

    @PostMapping("/add")
    public ResponseEntity<BaseResponse> createProduct(@RequestBody ProductDTO productDTO) {
        ProductDTO created = productService.createProduct(productDTO);
        BaseResponse response = new BaseResponse(200, "Tạo sản phẩm thành công", created);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<BaseResponse> updateProduct(@PathVariable Long id,
                                                      @RequestBody ProductDTO productDTO) {
        ProductDTO updated = productService.updateProduct(id, productDTO);
        BaseResponse response = new BaseResponse(200, "Cập nhật sản phẩm thành công", updated);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getproduct/{id}")
    public ResponseEntity<BaseResponse> getProduct(@PathVariable Long id) {
        return productService.getProductById(id)
                .map(product -> ResponseEntity.ok(new BaseResponse(200, "Lấy sản phẩm thành công", product)))
                .orElse(ResponseEntity.status(404).body(new BaseResponse(404, "Không tìm thấy sản phẩm", null)));
    }

    @GetMapping("/getAllProduct")
    public ResponseEntity<BaseResponse> getAllProducts() {
        List<ProductDTO> products = productService.getAllProducts();
        return ResponseEntity.ok(new BaseResponse(200, "Lấy danh sách sản phẩm thành công", products));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BaseResponse> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok(new BaseResponse(200, "Xoá sản phẩm thành công", null));
    }
}
