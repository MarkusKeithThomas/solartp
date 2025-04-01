package ecommerce.project.service;

import ecommerce.project.dto.CartItemDTO;
import ecommerce.project.dtorequest.CartItemRequest;

import java.util.List;

public interface GuestCartService {
    void saveGuestCart(String uuid, List<CartItemRequest> cartItemRequests);
    List<CartItemDTO> getGuestCart(String uuid);
    void clearGuestCart(String uuid);
}
