package ecommerce.project.controller;

import ecommerce.project.baseresponse.BaseResponse;
import ecommerce.project.dto.CartItemDTO;
import ecommerce.project.dtorequest.CartItemRequest;
import ecommerce.project.dtorequest.CartRequest;
import ecommerce.project.service.GuestCartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/guest/cart")
@RequiredArgsConstructor
public class GuestCartController {

    private final GuestCartService guestCartService;

    @PostMapping
    public ResponseEntity<?> syncCartToRedis(@RequestBody CartRequest request) {
        if (request.getUuidToken() == null || request.getItems().isEmpty()) {
            return ResponseEntity.badRequest().body("Missing uuid or cartItems");
        }
        guestCartService.saveGuestCartToRedis(request.getUuidToken(), request.getItems());
        return ResponseEntity.ok(new BaseResponse(200,"Lấy dữ liệu từ Redis thành công.",null));
    }

    @GetMapping("/{uuid}")
    public ResponseEntity<List<CartItemRequest>> getCart(@PathVariable String uuid) {
        List<CartItemRequest> cartItems = guestCartService.getGuestCart(uuid);
        return ResponseEntity.ok(cartItems);
    }

    @DeleteMapping("/{uuid}")
    public ResponseEntity<String> clearCart(@PathVariable String uuid) {
        guestCartService.clearGuestCart(uuid);
        return ResponseEntity.ok("Cart cleared");
    }
}
