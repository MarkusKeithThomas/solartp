package ecommerce.project.factory;

import ecommerce.project.dtorequest.OrderRequest;
import ecommerce.project.entity.*;
import ecommerce.project.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class OrderFactory {

    public OrderEntity createOrder(
            OrderRequest request,
            BigDecimal totalAmount,
            BigDecimal discountAmount,
            Map<Long, ProductEntity> productMap,
            UserEntity user,
            CartEntity cart,
            VoucherEntity voucher
    ) {
        String orderCode = generateOrderCode();
        BigDecimal finalAmount = totalAmount.subtract(discountAmount);

        OrderEntity order = new OrderEntity();
        order.setOrderCode(orderCode);
        order.setUser(user);
        order.setCart(cart);
        order.setVoucher(voucher);
        order.setTotalAmount(totalAmount);
        order.setDiscountAmount(discountAmount);
        order.setFinalAmount(finalAmount);
        order.setPaymentMethod(request.getPaymentMethod());
        order.setPaymentStatus(PaymentStatus.UNPAID);
        order.setStatus(OrderStatus.PLACED);
        order.setNote(request.getNote());
        order.setCreatedAt(LocalDateTime.now());
        order.setUpdatedAt(LocalDateTime.now());

        // Items
        List<OrderItemEntity> items = request.getOrderItems().stream().map(item -> {
            ProductEntity product = productMap.get(item.getProductId());
            if (product == null) throw new RuntimeException("Sản phẩm không tồn tại: " + item.getProductId());

            return OrderItemEntity.builder()
                    .order(order)
                    .product(product)
                    .productName(product.getName())
                    .productSku(product.getSkuProduct())
                    .quantity(item.getQuantity())
                    .price(product.getNewPrice())
                    .totalPrice(product.getNewPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                    .build();
        }).collect(Collectors.toList());

        order.setItems(items);

        // Address
        ShippingAddressEntity address = new ShippingAddressEntity();
        address.setOrder(order);
        address.setUser(user);
        address.setFullName(request.getShippingAddress().getFullName());
        address.setEmail(request.getShippingAddress().getEmail());
        address.setPhone(request.getShippingAddress().getPhone());
        address.setAddressLine(request.getShippingAddress().getAddressLine());
        address.setProvince(request.getShippingAddress().getProvince());
        address.setDistrict(request.getShippingAddress().getDistrict());
        address.setWard(request.getShippingAddress().getWard());
        address.setAddressNote(request.getShippingAddress().getAddressNote());
        address.setType(request.getShippingAddress().getType());

        order.setShippingAddress(address);

        return order;
    }

    private String generateOrderCode() {
        return "ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}
