package ecommerce.project.service;

import ecommerce.project.dtorequest.CartItemRequest;

import java.util.List;

public interface GuestCartService {

    void saveGuestCartToRedis(String uuid, List<CartItemRequest> items);

    List<CartItemRequest> getGuestCart(String uuid);

    void clearGuestCart(String uuid);

    void syncGuestCartsToMySQL();
}