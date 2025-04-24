package ecommerce.project.service;

import java.util.List;

public interface StockRedisService {
    long decrementStock(Long productId, int quantity);
    void restoreStock(Long productId, int quantity);
    void syncStockToDatabase();
        void preloadStockFromDatabase();
    void deleteStockKey(Long productId);
    int hasEnoughStock(Long productId, int quantity);
    boolean decrementMultiProduct(List<Long> productIds, List<Integer> quantities);
    }
