package ecommerce.project.service;

import ecommerce.project.dtorequest.ProductDTO;
import java.util.List;
import java.util.Optional;

public interface ProductServiceDTO {

    // CRUD sản phẩm bằng DTO
    ProductDTO createProduct(ProductDTO productDTO);

    ProductDTO updateProduct(Long id, ProductDTO productDTO);

    Optional<ProductDTO> getProductById(Long id);

    List<ProductDTO> getAllProducts();

    void deleteProduct(Long id);
}
