package ecommerce.project.service;

import ecommerce.project.model.StockCheckResult;

import java.util.List;

public interface StockRedisService {
    long decrementStock(Long productId, int quantity);
    void restoreStock(Long productId, int quantity);
    void syncStockRedisToDatabase();
    void preloadStockFromDatabase();
    void deleteStockKey(Long productId);
    StockCheckResult hasEnoughStock(Long productId, int quantity);
    boolean decrementMultiProduct(List<Long> productIds, List<Integer> quantities);
    }
