package ecommerce.project.controller;

import ecommerce.project.dto.CartItemDTO;
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
    public ResponseEntity<String> syncCartToRedis(@RequestBody CartRequest request) {
        if (request.getUuidToken() == null || request.getItems().isEmpty()) {
            return ResponseEntity.badRequest().body("Missing uuid or cartItems");
        }

        guestCartService.saveGuestCart(request.getUuidToken(), request.getItems());
        return ResponseEntity.ok("Cart saved successfully");
    }

    @GetMapping("/{uuid}")
    public ResponseEntity<List<CartItemDTO>> getCart(@PathVariable String uuid) {
        List<CartItemDTO> cartItems = guestCartService.getGuestCart(uuid);
        return ResponseEntity.ok(cartItems);
    }

    @DeleteMapping("/{uuid}")
    public ResponseEntity<String> clearCart(@PathVariable String uuid) {
        guestCartService.clearGuestCart(uuid);
        return ResponseEntity.ok("Cart cleared");
    }
}
