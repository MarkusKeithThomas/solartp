package ecommerce.project.service;

import ecommerce.project.dto.*;
import ecommerce.project.dtorequest.CartRequest;
import ecommerce.project.dtoresponse.CartResponse;
import ecommerce.project.repository.CartItemRepository;
import ecommerce.project.repository.CartRepository;
import ecommerce.project.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;


    @Override
    public CartResponse getCartByUserId(Integer userId) {
        return null;
    }

    @Override
    public CartResponse getCartByUuid(String uuidToken) {
        return null;
    }

    @Override
    public CartResponse createCart(CartRequest cartRequest) {

        return null;
    }

    @Override
    public CartResponse addItemToCart(Long cartId, CartItemDTO itemDTO) {
        return null;
    }

    @Override
    public CartResponse updateCartItem(Long cartItemId, CartItemDTO itemDTO) {
        return null;
    }

    @Override
    public void deleteCartItem(Long cartItemId) {

    }

    @Override
    public void clearCart(Long cartId) {

    }

    @Override
    public double calculateCartTotal(Long cartId) {
        return 0;
    }

    @Override
    public List<CartItemDTO> getCartItems(Long cartId) {
        return null;
    }
}