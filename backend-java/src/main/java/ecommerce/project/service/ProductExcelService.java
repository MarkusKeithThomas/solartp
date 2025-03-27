package ecommerce.project.service;

import ecommerce.project.dto.ProductDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductExcelService {

    // Thêm mới sản phẩm (bao gồm ảnh và đặc tả)
    String createProduct(MultipartFile file);

    // Cập nhật sản phẩm theo ID
    ProductDTO updateProduct(Long id, ProductDTO dto);

    // Xoá sản phẩm (logic hoặc vật lý)
    void deleteProduct(Long id);

    // Lấy danh sách sản phẩm
    List<ProductDTO> getAllProducts();

    // Lấy sản phẩm theo ID
    ProductDTO getProductById(Long id);
}
