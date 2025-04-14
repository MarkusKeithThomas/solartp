package ecommerce.project.service;


import ecommerce.project.dtorequest.OrderRequest;
import ecommerce.project.dtoresponse.OrderResponse;
import ecommerce.project.model.OrderStatus;
import ecommerce.project.model.PaymentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface OrderService {

    // 1. Tạo đơn hàng mới
    OrderResponse createOrder(OrderRequest request);

    List<OrderResponse> getOrderByPhone(String phone);

    // 2. Lấy chi tiết đơn hàng theo ID
    OrderResponse getOrderById(Long orderId);

    // 3. Lấy danh sách đơn hàng của một user (có phân trang)
    Page<OrderResponse> getOrdersByUserId(Long userId, Pageable pageable);

    // 4. Cập nhật trạng thái đơn hàng (dùng cho admin hoặc xử lý webhook thanh toán)
    void updateOrderStatus(Long orderId, OrderStatus status);

    // 5. Cập nhật trạng thái thanh toán (ví dụ: từ UNPAID → PAID sau khi thanh toán)
    void updatePaymentStatus(Long orderId, PaymentStatus status);

    // 6. Huỷ đơn hàng (chỉ khi đơn chưa giao)
    void cancelOrder(Long orderId);

    // 7. Tìm đơn hàng theo mã order_code (dành cho tracking)
    OrderResponse getOrderByCode(String orderCode);
}