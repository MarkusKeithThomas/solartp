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

}

