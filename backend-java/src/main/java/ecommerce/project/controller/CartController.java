package ecommerce.project.controller;

import ecommerce.project.baseresponse.BaseResponse;
import ecommerce.project.dtorequest.CartItemRequest;
import ecommerce.project.model.StockCheckResult;
import ecommerce.project.service.StockRedisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
public class CartController {
    @Autowired
    private StockRedisService stockRedisService;

    @PostMapping("/check-stock")
    public ResponseEntity<?> checkStock(@RequestBody CartItemRequest request) {
        StockCheckResult mess = stockRedisService.hasEnoughStock(request.getProductId(), request.getQuantity());
        return ResponseEntity.ok(new BaseResponse(200,"Thông tin kiêm tra đơn hàng thành công",mess));
    }
}
