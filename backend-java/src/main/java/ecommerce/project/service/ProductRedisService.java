package ecommerce.project.service;

import ecommerce.project.dtoresponse.ProductResponseDTO;

import java.util.List;

public interface ProductRedisService {
    void syncAllActiveProductsToRedis();
    List<ProductResponseDTO> getAllProductsFromRedis();

}