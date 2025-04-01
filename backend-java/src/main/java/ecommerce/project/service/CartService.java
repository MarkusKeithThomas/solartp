package ecommerce.project.service;

import ecommerce.project.dto.CartItemDTO;
import ecommerce.project.dtorequest.CartRequest;
import ecommerce.project.dtoresponse.CartResponse;

import java.util.List;

public interface CartService {

    // Lấy giỏ hàng theo userId (người đã đăng nhập)
    CartResponse getCartByUserId(Integer userId);

    // Lấy giỏ hàng theo uuid_token (người dùng chưa đăng nhập)
    CartResponse getCartByUuid(String uuidToken);

    // Tạo giỏ hàng mới
    CartResponse createCart(CartRequest cartRequest);

    // Thêm 1 sản phẩm vào giỏ
    CartResponse addItemToCart(Long cartId, CartItemDTO itemDTO);

    // Cập nhật số lượng hoặc thông tin 1 sản phẩm trong giỏ
    CartResponse updateCartItem(Long cartItemId, CartItemDTO itemDTO);

    // Xoá 1 sản phẩm khỏi giỏ
    void deleteCartItem(Long cartItemId);

    // Xoá toàn bộ giỏ hàng
    void clearCart(Long cartId);

    // Tính tổng tiền hiện tại trong giỏ (nếu cần xuất riêng)
    double calculateCartTotal(Long cartId);

    // Lấy toàn bộ item trong 1 giỏ
    List<CartItemDTO> getCartItems(Long cartId);
}