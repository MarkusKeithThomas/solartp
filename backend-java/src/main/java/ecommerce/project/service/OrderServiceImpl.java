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
import ecommerce.project.producer.OrderEventPublisher;
import ecommerce.project.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final VoucherService voucherService;
    private final ProductRepository productRepository;
    private final CartRepository cartRepository;
    private final VoucherRepository voucherRepository;
    private final OrderFactory orderFactory;
    private final StockRedisService stockRedisService;
    private final UserRepository userRepository;
    private final OrderEventPublisher orderEventPublisher;


    @Override
    @Transactional
    public OrderResponse createOrder(OrderRequest request) {
        // 1. Validate
        if (request.getOrderItems() == null || request.getOrderItems().isEmpty()) {
            throw new IllegalArgumentException("Đơn hàng không có sản phẩm");
        }

        // 2. Chuẩn bị dữ liệu sản phẩm
        List<Long> productIds = request.getOrderItems().stream()
                .map(OrderItemRequest::getProductId)
                .distinct()
                .toList();

//        List<Integer> quantities = request.getOrderItems().stream()
//                .map(OrderItemRequest::getQuantity)
//                .toList();

        Map<Long, Integer> productQuantityMap = request.getOrderItems().stream()
                .collect(Collectors.toMap(OrderItemRequest::getProductId, OrderItemRequest::getQuantity, Integer::sum));

        Map<Long, ProductEntity> productMap = productRepository.findAllById(productIds).stream()
                .collect(Collectors.toMap(ProductEntity::getId, Function.identity()));


        boolean success = stockRedisService.decrementMultiProduct(
                new ArrayList<>(productQuantityMap.keySet()),
                new ArrayList<>(productQuantityMap.values())
        );

        if (!success) {
            log.warn("❌ Trừ kho thất bại cho request {} ở Redis", request.getShippingAddress().getPhone());
            // Có thể gửi về DLQ hoặc update status đơn hàng (manual handling)
            // Dong bo du lieu mysql len redis
            stockRedisService.preloadStockFromDatabase();
            log.info("✅ Hoàn tất đồng bộ stock từ mysql lên redis ở Queue InventoryDeductConsumer thành công vì key có thể bị mất lúc check.");

        } else {
            log.info("✅ Trừ kho thành công cho orderId {}", request.getShippingAddress().getPhone());

        }

        // 3. Tính tổng tiền
        BigDecimal totalAmount = request.getOrderItems().stream()
                .map(item -> {
                    ProductEntity product = productMap.get(item.getProductId());
                    if (product == null) {
                        throw new RuntimeException("Không tìm thấy sản phẩm ID: " + item.getProductId());
                    }
                    return product.getNewPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
                })
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // 4. Xử lý voucher nếu có
        BigDecimal discountAmount = BigDecimal.ZERO;
        VoucherEntity voucher = null;
        if (StringUtils.hasText(request.getVoucherCode())) {
            VoucherResponse voucherResponse = voucherService.validate(request.getVoucherCode(), totalAmount);
            discountAmount = voucherResponse.getDiscount();
            voucher = voucherRepository.findByCodeIgnoreCase(voucherResponse.getCode()).orElse(null);
        }

        // 5. Lấy user/cart nếu có
        UserEntity user = Optional.ofNullable(request.getShippingAddress().getEmail())
                .flatMap(userRepository::findByEmail)
                .orElse(null);

        CartEntity cart = Optional.ofNullable(request.getCartId())
                .flatMap(cartRepository::findById)
                .orElse(null);

        // 6. Tạo và lưu order
        OrderEntity order = orderFactory.createOrder(request, totalAmount, discountAmount, productMap, user, cart, voucher);
        orderRepository.save(order); // ✅ chỉ lưu DB, chưa trừ kho

        // 7. Đăng sự kiện trừ kho qua RabbitMQ
        orderEventPublisher.publishOrderCreatedEvent(order.getId(), productQuantityMap);

        return OrderMapper.toResponse(order);
    }

    @Override
    @Transactional
    public void updateOrderStatus(Long orderId, String newStatus) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Đơn hàng không tồn tại với ID: " + orderId));

        order.setStatus(OrderStatus.valueOf(newStatus));
        orderRepository.save(order);

        log.info("✅ Đã cập nhật trạng thái đơn hàng {} thành '{}'.", orderId, newStatus);
    }

    @Override
    public List<OrderResponse> getAllOrders() {
        List<OrderEntity> allOrders = orderRepository.findAll();
        return allOrders.stream()
                .map(OrderMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderResponse> getOrderByPhone(String phone) {
        List<OrderEntity> list = orderRepository.findUnfinishedOrdersByPhone(phone);
        List<OrderResponse> responseList = new ArrayList<>();
        for (OrderEntity order:list){
            OrderResponse orderResponse = OrderMapper.toResponse(order);
            if (orderResponse != null){
                responseList.add(orderResponse);
            }
        }


        return responseList;
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

    public boolean checkQuantityFromDatabase(Map<Long, Integer> productMap) {
        // Lấy toàn bộ sản phẩm từ DB theo danh sách productId
        List<ProductEntity> products = productRepository.findAllById(productMap.keySet());

        // Kiểm tra từng sản phẩm có đủ số lượng không
        for (ProductEntity product : products) {
            Long productId = product.getId();
            int requiredQuantity = productMap.get(productId);
            if (product.getStockQuantity() < requiredQuantity) {
                return false; // Thiếu hàng
            }
        }

        // Nếu không thiếu cái nào
        return true;
    }
}