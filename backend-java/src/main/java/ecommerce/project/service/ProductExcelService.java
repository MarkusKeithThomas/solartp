package ecommerce.project.service;

import ecommerce.project.baseresponse.CustomPageResponse;
import ecommerce.project.dtorequest.ProductDTO;
import ecommerce.project.dtorequest.ProductImageDTO;
import ecommerce.project.dtorequest.ProductSpecificationDTO;
import ecommerce.project.dtoresponse.ProductResponseDTO;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface ProductExcelService {

    // Thêm mới sản phẩm (bao gồm ảnh và đặc tả)
    List<String> createProduct(MultipartFile file);

    // Cập nhật sản phẩm theo ID
    ProductResponseDTO updateProduct(Long id, ProductDTO dto);

    // Xoá sản phẩm (logic hoặc vật lý)
    void deleteProduct(Long id);

    // Lấy danh sách sản phẩm
    CustomPageResponse<ProductResponseDTO> getAllProducts(Pageable pageable);

    // Lấy sản phẩm theo ID
    ProductResponseDTO getProductDetailById(Long id, HttpServletRequest request);

    ProductResponseDTO updateBasicFields(Long id, Map<String, Object> updates);
    void updateImages(Long productId, List<ProductImageDTO> images);
    void updateSpecifications(Long productId, Map<String, List<ProductSpecificationDTO>> specificationGroups);
}
