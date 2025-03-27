package ecommerce.project.exception;

public class ProductNotFoundException extends RuntimeException {
    public ProductNotFoundException(Long id) {
        super("Không tìm thấy sản phẩm với ID: " + id);
    }
}