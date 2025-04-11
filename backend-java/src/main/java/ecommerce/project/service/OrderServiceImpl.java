package ecommerce.project.service;

import ecommerce.project.dtorequest.InventoryDeductRequestDTO;
import ecommerce.project.dtorequest.OrderItemRequest;
import ecommerce.project.dtorequest.OrderRequest;
import ecommerce.project.dtoresponse.OrderResponse;
import ecommerce.project.dtoresponse.VoucherResponse;
import ecommerce.project.entity.*;
import ecommerce.project.exception.StockException;
import ecommerce.project.factory.OrderFactory;
import ecommerce.project.mapper.OrderMapper;
import ecommerce.project.model.OrderStatus;
import ecommerce.project.model.PaymentStatus;
import ecommerce.project.producer.InventoryProducer;
import ecommerce.project.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final VoucherService voucherService;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final VoucherRepository voucherRepository;
    private final OrderFactory orderFactory;
    private final StockRedisService stockRedisService;
    private final InventoryProducer inventoryProducer;

    @Override
    @Transactional
    public OrderResponse createOrder(OrderRequest request, int userId) {
        // Validate đầu vào
        if (request.getOrderItems() == null || request.getOrderItems().isEmpty()) {
            throw new IllegalArgumentException("Đơn hàng không có sản phẩm");
        }

        // 1. Lấy danh sách sản phẩm từ productId
        List<Long> productIds = request.getOrderItems().stream()
                .map(OrderItemRequest::getProductId)
                .distinct()
                .toList();
        List<Integer> quantities = request.getOrderItems().stream()
                .map(OrderItemRequest::getQuantity)
                .toList();

        Map<Long, ProductEntity> productMap = productRepository.findAllById(productIds).stream()
                .collect(Collectors.toMap(ProductEntity::getId, Function.identity()));

        boolean success = stockRedisService.decrementMultiProduct(productIds,quantities);
        if (!success){
            throw new StockException("Một số sản phẩm trong kho không đủ hàng.");
        }

        // 2. Tính tổng tiền
        BigDecimal totalAmount = request.getOrderItems().stream()
                .map(item -> {
                    ProductEntity product = productMap.get(item.getProductId());
                    if (product == null) {
                        throw new RuntimeException("Không tìm thấy sản phẩm ID: " + item.getProductId());
                    }
                    return product.getNewPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
                })
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // 3. Áp dụng voucher nếu có
        BigDecimal discountAmount = BigDecimal.ZERO;
        VoucherEntity voucher = null;
        if (request.getVoucherCode() != null && !request.getVoucherCode().isBlank()) {
            VoucherResponse voucherResponse = voucherService.validate(request.getVoucherCode(), totalAmount);
            discountAmount = voucherResponse.getDiscount();
            voucher = voucherRepository.findByCodeIgnoreCase(voucherResponse.getCode()).orElse(null);
        }

        // 4. Lấy user, cart
        UserEntity user = userRepository.findById(userId)
                .orElseGet(() -> {
                    UserEntity u = new UserEntity();
                    u.setId(userId);
                    return u;
                });

        CartEntity cart = cartRepository.findById(request.getCartId()).orElse(null);

        // 5. Tạo order bằng factory
        OrderEntity order = orderFactory.createOrder(
                request,
                totalAmount,
                discountAmount,
                productMap,
                user,
                cart,
                voucher
        );

        // 6. Lưu DB
        orderRepository.save(order);
        inventoryProducer.sendInventoryDeductRequest(
                new InventoryDeductRequestDTO(
                        order.getId(),
                        request.getOrderItems().stream()
                                .map(i -> new InventoryDeductRequestDTO.ProductQuantity(i.getProductId(),i.getQuantity()))
                                .collect(Collectors.toList())
                ));
        return OrderMapper.toResponse(order);
    }

    @Override
    public OrderResponse getOrderById(Long orderId) {
        return null;
    }

    @Override
    public Page<OrderResponse> getOrdersByUserId(Long userId, Pageable pageable) {
        return null;
    }

    @Override
    public void updateOrderStatus(Long orderId, OrderStatus status) {

    }

    @Override
    public void updatePaymentStatus(Long orderId, PaymentStatus status) {

    }

    @Override
    public void cancelOrder(Long orderId) {

    }

    @Override
    public OrderResponse getOrderByCode(String orderCode) {
        return null;
    }


    // ==== Helper methods ====
    private String generateOrderCode() {
        return "ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    private BigDecimal calculateTotalAmount(OrderRequest request) {
        if (request == null || request.getOrderItems() == null || request.getOrderItems().isEmpty()) {
            throw new IllegalArgumentException("Danh sách sản phẩm không được để trống");
        }

        return request.getOrderItems().stream()
                .map(item -> {
                    if (item.getProductId() == null || item.getQuantity() == null || item.getQuantity() <= 0) {
                        throw new IllegalArgumentException("Sản phẩm không hợp lệ");
                    }

                    ProductEntity product = productRepository.findById(item.getProductId())
                            .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm ID: " + item.getProductId()));

                    return product.getNewPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
                })
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

}