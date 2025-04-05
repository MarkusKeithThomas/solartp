package ecommerce.project.service;

public interface ProductViewService {
    void incrementViewIfAllowed(Long productId, String ipAddress);
    long getViewCount(Long productId);
}
