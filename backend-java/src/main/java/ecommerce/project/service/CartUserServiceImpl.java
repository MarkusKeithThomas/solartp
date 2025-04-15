package ecommerce.project.service;

import ecommerce.project.dto.CartItemDTO;
import ecommerce.project.dtoresponse.CartItemResponse;
import ecommerce.project.dtoresponse.CartResponse;
import ecommerce.project.dtorequest.CartItemRequest;
import ecommerce.project.entity.CartEntity;
import ecommerce.project.entity.CartEntity.CartStatus;
import ecommerce.project.entity.CartItemEntity;
import ecommerce.project.entity.ProductEntity;
import ecommerce.project.exception.ProductNotFoundException;
import ecommerce.project.repository.CartItemRepository;
import ecommerce.project.repository.CartRepository;
import ecommerce.project.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Slf4j
@Service
public class CartUserServiceImpl implements CartUserService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;

    @Qualifier("userCartRedisTemplate")
    private final RedisTemplate<String, CartResponse> redisTemplate;

    private static final String REDIS_PREFIX = "user_cart:";
    private static final long TTL = 1; // 1 day

    public CartUserServiceImpl(CartRepository cartRepository, CartItemRepository cartItemRepository, ProductRepository productRepository, RedisTemplate<String, CartResponse> redisTemplate) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.redisTemplate = redisTemplate;
    }

    @Override
    public CartResponse getOrCreateCart(Integer userId) {
        String key = REDIS_PREFIX + userId;
        CartResponse cached = redisTemplate.opsForValue().get(key);
        if (cached != null) return cached;

        Optional<CartEntity> existing = cartRepository.findByUserId(userId);
        CartEntity cart = existing.orElseGet(() -> {
            CartEntity newCart = new CartEntity();
            newCart.setUserId(userId);
            newCart.setStatus(CartStatus.ACTIVE);
            newCart.setExpiredAt(LocalDateTime.now().plusDays(2));
            return cartRepository.save(newCart);
        });

        cart.setItems(cartItemRepository.findByCartId(cart.getId()));
        CartResponse response = convertToResponse(cart);
        redisTemplate.opsForValue().set(key, response, TTL, TimeUnit.DAYS);
        return response;
    }

    @Override
    public CartResponse addItemToCart(Integer userId, CartItemDTO itemDTO) {
        CartEntity cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("Cart not found"));

        ProductEntity product = productRepository.findById(itemDTO.getProductId())
                .orElseThrow(() -> new ProductNotFoundException(itemDTO.getProductId()));

        CartItemEntity item = new CartItemEntity();
        item.setCart(cart);
        item.setProductId(product.getId());
        item.setQuantity(itemDTO.getQuantity());
        item.setUnitPrice(product.getNewPrice());
        item.setDiscountApplied(BigDecimal.ZERO);
        item.setCreatedAt(LocalDateTime.now());

        cartItemRepository.save(item);
        cart.setUpdatedAt(LocalDateTime.now());
        cartRepository.save(cart);

        cart.setItems(cartItemRepository.findByCartId(cart.getId()));
        CartResponse response = convertToResponse(cart);
        redisTemplate.opsForValue().set(REDIS_PREFIX + userId, response, TTL, TimeUnit.DAYS);
        return response;
    }

    @Override
    public CartResponse updateCartItem(Long cartItemId, CartItemRequest itemDTO) {
        CartItemEntity item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new IllegalArgumentException("Cart item not found"));

        item.setQuantity(itemDTO.getQuantity());
        cartItemRepository.save(item);

        CartEntity cart = item.getCart();
        cart.setUpdatedAt(LocalDateTime.now());
        cartRepository.save(cart);

        cart.setItems(cartItemRepository.findByCartId(cart.getId()));
        CartResponse response = convertToResponse(cart);
        redisTemplate.opsForValue().set(REDIS_PREFIX + cart.getUserId(), response, TTL, TimeUnit.DAYS);
        return response;
    }

    @Override
    public void deleteCartItem(Long cartItemId) {
        CartItemEntity item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new IllegalArgumentException("Cart item not found"));
        Integer userId = item.getCart().getUserId();
        cartItemRepository.deleteById(cartItemId);
        redisTemplate.delete(REDIS_PREFIX + userId);
    }

    @Override
    public void clearCart(Integer userId) {
        cartRepository.findByUserId(userId).ifPresent(cart -> {
            cartItemRepository.deleteAllByCartId(cart.getId());
            redisTemplate.delete(REDIS_PREFIX + userId);
        });
    }

    @Override
    public BigDecimal calculateCartTotal(Integer userId) {
        CartResponse response = getOrCreateCart(userId);
        return response.getTotalAmount();
    }

    @Override
    public List<CartItemResponse> getCartItems(Integer userId) {
        CartResponse response = getOrCreateCart(userId);
        return response.getItems();
    }

    @Override
    @Transactional
    public CartResponse checkoutCart(Integer userId) {
        CartEntity cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("Cart not found"));
        cart.setStatus(CartStatus.CHECKED_OUT);
        cart.setUpdatedAt(LocalDateTime.now());
        cartRepository.save(cart);
        cart.setItems(cartItemRepository.findByCartId(cart.getId()));
        redisTemplate.delete(REDIS_PREFIX + userId);
        return convertToResponse(cart);
    }

    @Override
    @Transactional
    public CartResponse mergeCart(String guestUuidToken, Integer userId) {
        Optional<CartEntity> guestCartOpt = cartRepository.findByUuidToken(guestUuidToken);
        Optional<CartEntity> userCartOpt = cartRepository.findByUserId(userId);

        if (guestCartOpt.isEmpty()) return getOrCreateCart(userId);

        CartEntity guestCart = guestCartOpt.get();
        CartEntity userCart = userCartOpt.orElseGet(() -> {
            CartEntity newCart = new CartEntity();
            newCart.setUserId(userId);
            newCart.setStatus(CartStatus.ACTIVE);
            newCart.setExpiredAt(LocalDateTime.now().plusDays(2));
            return cartRepository.save(newCart);
        });

        List<CartItemEntity> userItems = Optional.ofNullable(userCart.getItems())
                .orElse(cartItemRepository.findByCartId(userCart.getId()));

        for (CartItemEntity guestItem : guestCart.getItems()) {
            boolean exists = userItems.stream()
                    .anyMatch(i -> i.getProductId().equals(guestItem.getProductId()));

            if (!exists) {
                CartItemEntity newItem = new CartItemEntity();
                newItem.setCart(userCart);
                newItem.setProductId(guestItem.getProductId());
                newItem.setQuantity(guestItem.getQuantity());
                newItem.setUnitPrice(guestItem.getUnitPrice());
                newItem.setDiscountApplied(guestItem.getDiscountApplied());
                newItem.setCreatedAt(LocalDateTime.now());
                cartItemRepository.save(newItem);
            }
        }
        cartRepository.delete(guestCart);
        userCart.setItems(cartItemRepository.findByCartId(userCart.getId()));
        CartResponse response = convertToResponse(userCart);
        redisTemplate.opsForValue().set(REDIS_PREFIX + userId, response, TTL, TimeUnit.DAYS);
        return response;
    }

    private CartResponse convertToResponse(CartEntity cart) {
        List<CartItemEntity> items = Optional.ofNullable(cart.getItems())
                .orElse(cartItemRepository.findByCartId(cart.getId()));

        BigDecimal total = items.stream()
                .map(CartItemEntity::getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        List<CartItemResponse> itemDTOs = items.stream()
                .map(item -> new CartItemResponse(item.getProductId(), item.getQuantity()))
                .collect(Collectors.toList());

        return new CartResponse(cart.getId(), cart.getUserId(), itemDTOs, total);
    }
}