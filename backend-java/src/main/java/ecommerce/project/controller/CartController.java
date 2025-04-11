package ecommerce.project.controller;

import ecommerce.project.baseresponse.BaseResponse;
import ecommerce.project.dtorequest.CartItemRequest;
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
        int stock = stockRedisService.hasEnoughStock(request.getProductId(), request.getQuantity());
        if (stock < 0) {
            return ResponseEntity.ok(new BaseResponse(200,"Không đủ hàng.",stock));
        }
        return ResponseEntity.ok(new BaseResponse(200,"Còn hàng.",stock));
    }
}
