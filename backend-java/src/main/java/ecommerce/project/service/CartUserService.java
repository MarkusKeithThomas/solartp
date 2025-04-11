package ecommerce.project.service;

import ecommerce.project.dto.CartItemDTO;
import ecommerce.project.dtorequest.CartItemRequest;
import ecommerce.project.dtoresponse.CartItemResponse;
import ecommerce.project.dtoresponse.CartResponse;

import java.math.BigDecimal;
import java.util.List;

public interface CartUserService {

    /**
     * Lấy giỏ hàng người dùng từ Redis nếu có, nếu không thì tạo mới trong MySQL.
     */
    CartResponse getOrCreateCart(Integer userId);

    /**
     * Thêm sản phẩm vào giỏ hàng của người dùng.
     */
    CartResponse addItemToCart(Integer userId, CartItemDTO itemDTO);

    /**
     * Cập nhật số lượng hoặc thông tin 1 sản phẩm trong giỏ hàng.
     */
    CartResponse updateCartItem(Long cartItemId, CartItemRequest itemDTO);

    /**
     * Xóa 1 sản phẩm khỏi giỏ hàng.
     */
    void deleteCartItem(Long cartItemId);

    /**
     * Xóa toàn bộ giỏ hàng của người dùng.
     */
    void clearCart(Integer userId);

    /**
     * Tính tổng tiền giỏ hàng của người dùng.
     */
    BigDecimal calculateCartTotal(Integer userId);

    /**
     * Lấy danh sách item trong giỏ hàng của người dùng.
     */
    List<CartItemResponse> getCartItems(Integer userId);

    /**
     * Đánh dấu giỏ hàng là đã thanh toán.
     */
    CartResponse checkoutCart(Integer userId);

    /**
     * Gộp giỏ hàng guest (qua uuidToken) vào giỏ hàng của user.
     */
    CartResponse mergeCart(String guestUuidToken, Integer userId);
}