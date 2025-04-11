package ecommerce.project.controller;

import ecommerce.project.dtorequest.OrderRequest;
import ecommerce.project.dtoresponse.OrderEmailDTO;
import ecommerce.project.dtoresponse.OrderResponse;
import ecommerce.project.model.OrderStatus;
import ecommerce.project.model.PaymentStatus;
import ecommerce.project.producer.EmailProducer;
import ecommerce.project.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final EmailProducer emailProducer;


    // Tạo đơn hàng mới
    @PostMapping("/add")
    public ResponseEntity<OrderResponse> createOrder(@RequestBody OrderRequest request,
                                                     @RequestHeader("X-USER-ID") int userId) {
        OrderResponse response = orderService.createOrder(request,userId);
        return ResponseEntity.ok(response);
    }
    @PostMapping("/confirm")
    public ResponseEntity<String> confirmOrder(@RequestBody OrderEmailDTO dto) {
        emailProducer.sendOrderConfirmation(dto);
        return ResponseEntity.ok("✅ Đã gửi message xác nhận đơn hàng vào RabbitMQ");
    }



//    // Lấy đơn hàng cụ thể
//    @GetMapping("/{orderId}")
//    public ResponseEntity<OrderResponse> getOrder(@PathVariable Long orderId,
//                                                  @RequestHeader("X-USER-ID") Long userId) {
//        return ResponseEntity.ok(orderService.getOrderById(orderId, userId));
//    }
//
//    // Lấy danh sách đơn hàng của người dùng (có phân trang)
//    @GetMapping("/my")
//    public ResponseEntity<Page<OrderResponse>> getUserOrders(@RequestHeader("X-USER-ID") Long userId,
//                                                             Pageable pageable) {
//        return ResponseEntity.ok(orderService.getOrdersByUser(userId, pageable));
//    }
//
//    // Hủy đơn hàng
//    @PostMapping("/{orderId}/cancel")
//    public ResponseEntity<Void> cancelOrder(@PathVariable Long orderId,
//                                            @RequestHeader("X-USER-ID") Long userId) {
//        orderService.cancelOrder(orderId, userId);
//        return ResponseEntity.ok().build();
//    }
//
//    // Retry thanh toán (nếu lỗi)
//    @PostMapping("/{orderId}/retry-payment")
//    public ResponseEntity<Void> retryPayment(@PathVariable Long orderId,
//                                             @RequestHeader("X-USER-ID") Long userId) {
//        orderService.retryPayment(orderId, userId);
//        return ResponseEntity.ok().build();
//    }
//
//    // ADMIN: cập nhật trạng thái đơn hàng
//    @PatchMapping("/{orderId}/status")
//    public ResponseEntity<Void> updateOrderStatus(@PathVariable Long orderId,
//                                                  @RequestParam OrderStatus status) {
//        orderService.updateOrderStatus(orderId, status);
//        return ResponseEntity.ok().build();
//    }
//
//    // ADMIN: cập nhật trạng thái thanh toán
//    @PatchMapping("/{orderId}/payment-status")
//    public ResponseEntity<Void> updatePaymentStatus(@PathVariable Long orderId,
//                                                    @RequestParam PaymentStatus status) {
//        orderService.updatePaymentStatus(orderId, status);
//        return ResponseEntity.ok().build();
//    }
//
//    // ADMIN: tìm kiếm đơn hàng
//    @GetMapping("/search")
//    public ResponseEntity<Page<OrderResponse>> searchOrders(
//            @RequestParam(required = false) String keyword,
//            @RequestParam(required = false) OrderStatus status,
//            @RequestParam(required = false) LocalDateTime from,
//            @RequestParam(required = false) LocalDateTime to,
//            Pageable pageable) {
//
//        return ResponseEntity.ok(orderService.searchOrders(keyword, status, from, to, pageable));
//    }
//
//    // ADMIN: lấy danh sách đơn hàng mới nhất
//    @GetMapping("/recent")
//    public ResponseEntity<List<OrderResponse>> getRecentOrders(@RequestParam(defaultValue = "5") int limit) {
//        return ResponseEntity.ok(orderService.getRecentOrders(limit));
//    }
}

