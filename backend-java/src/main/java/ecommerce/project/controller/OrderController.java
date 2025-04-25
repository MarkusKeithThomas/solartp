package ecommerce.project.controller;

import ecommerce.project.baseresponse.BaseResponse;
import ecommerce.project.dtorequest.OrderRequest;
import ecommerce.project.dtoresponse.OrderEmailDTO;
import ecommerce.project.dtoresponse.OrderResponse;
import ecommerce.project.producer.EmailProducer;
import ecommerce.project.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final EmailProducer emailProducer;


    // Tạo đơn hàng mới
    @PostMapping("/add")
    public ResponseEntity<OrderResponse> createOrder(@RequestBody OrderRequest request) {
        OrderResponse response = orderService.createOrder(request);
        return ResponseEntity.ok(response);
    }
    @PostMapping("/confirm")
    public ResponseEntity<String> confirmOrder(@RequestBody OrderEmailDTO dto) {
        emailProducer.sendOrderConfirmation(dto);
        return ResponseEntity.ok("✅ Đã gửi message xác nhận đơn hàng vào RabbitMQ");
    }
    @GetMapping("/id")
    public ResponseEntity<?> getOrderByPhone(@RequestParam("phone") String phone) {
        List<OrderResponse> orderResponse = orderService.getOrderByPhone(phone);
        if (orderResponse.size() == 0 ){
            return ResponseEntity.ok(new BaseResponse(200,"Lấy đơn hàng thành công!","Hiện tại bạn không có đơn hàng nào"));
        } else {
            return ResponseEntity.ok(new BaseResponse(200, "Lấy đơn hàng thành công", orderResponse));
        }
    }
    @GetMapping("/admin")
    public ResponseEntity<?> getAllOrders() {
        List<OrderResponse> orders = orderService.getAllOrders();
        return ResponseEntity.ok(new BaseResponse(200,"Lấy danh sách đơn hàng thành công", orders));
    }

    @PatchMapping("/{orderId}/status")
    public ResponseEntity<?> updateOrderStatus(
            @PathVariable Long orderId,
            @RequestParam String newStatus) {
            orderService.updateOrderStatus(orderId, newStatus);
        return ResponseEntity.ok(new BaseResponse(200,"Đã cập nhật thành công đơn hàng"+orderId, null));
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

