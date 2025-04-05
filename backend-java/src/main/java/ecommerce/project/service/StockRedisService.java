package ecommerce.project.service;

public interface StockRedisService {
    boolean decrementStock(Long productId, int quantity);
    void restoreStock(Long productId, int quantity);
    void preloadStockFromDatabase();
    void deleteStockKey(Long productId);
    int hasEnoughStock(Long productId, int quantity);
}
