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
import ecommerce.project.utils.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.oauth2.jwt.Jwt;
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
    private final CartRepository cartRepository;
    private final VoucherRepository voucherRepository;
    private final OrderFactory orderFactory;
    private final StockRedisService stockRedisService;
    private final InventoryProducer inventoryProducer;
    private final UserRepository userRepository;


    @Override
    @Transactional
    public OrderResponse createOrder(OrderRequest request) {

 

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

        boolean success = stockRedisService.decrementMultiProduct(productIds, quantities);
        if (!success) {
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
        UserEntity user = null;
        String email = request.getShippingAddress().getEmail();
        if ( email != null) {
            user = userRepository.findByEmail(email).orElse(null);
        }


        CartEntity cart = null;
        if (request.getCartId() != null && !request.getCartId().toString().isBlank()) {
            cart = cartRepository.findById(request.getCartId()).orElse(null);
        }
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
                                .map(i -> new InventoryDeductRequestDTO.ProductQuantity(i.getProductId(), i.getQuantity()))
                                .collect(Collectors.toList())
                ));
//        if (cart != null) {
//            cartRepository.delete(cart);
//        }
        return OrderMapper.toResponse(order);
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
}