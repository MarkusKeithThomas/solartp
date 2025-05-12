package ecommerce.project.service;

import ecommerce.project.dtorequest.InventoryDeductRequestDTO;
import ecommerce.project.exception.StockException;
import ecommerce.project.repository.ProductRepository;
import ecommerce.project.utils.RedisKeyPrefix;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class InventoryServiceImpl implements InventoryService {

    private final ProductRepository productRepository;
    private final StockRedisService stockRedisService;

    @Transactional
    public void deductStock(InventoryDeductRequestDTO dto) {
        for (InventoryDeductRequestDTO.ProductQuantity item : dto.getItems()) {
            // ✅ CHỈ trừ trong MySQL
            int rows = productRepository.decreaseStock(item.getProductId(), item.getQuantity());


            if (rows ==  0) {
                // ❌ Nếu MySQL lỗi, rollback Redis lại số lượng vì đã bị trừ trong phương thức sau
                /**
                 *      boolean success = stockRedisService.decrementMultiProduct(productIds, quantities);
                 *         if (!success) {
                 *             throw new StockException("Một số sản phẩm trong kho không đủ hàng.");
                 *         }
                 *         trong phần method    OrderResponse createOrder(OrderRequest request); */

                stockRedisService.restoreStock(item.getProductId(), item.getQuantity());
                log.error("❌ Không trừ được kho MySQL cho sản phẩm {}", item.getProductId());
                throw new StockException("Stock: Trừ kho thất bại!");
            }

            log.info("✅ Trừ kho MySQL thành công SP {} - SL {}", item.getProductId(), item.getQuantity());
        }

        log.info("🎉 Trừ kho hoàn tất đơn hàng {}", dto.getOrderId());
    }
}