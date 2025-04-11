package ecommerce.project.mapper;

import ecommerce.project.dtoresponse.OrderResponse;
import ecommerce.project.entity.OrderEntity;

import java.util.stream.Collectors;

public class OrderMapper {

    public static OrderResponse toResponse(OrderEntity entity) {
        return OrderResponse.builder()
                .id(entity.getId())
                .orderCode(entity.getOrderCode())
                .totalAmount(entity.getTotalAmount())
                .discountAmount(entity.getDiscountAmount())
                .finalAmount(entity.getFinalAmount())
                .paymentMethod(entity.getPaymentMethod())
                .paymentStatus(entity.getPaymentStatus())
                .status(entity.getStatus())
                .note(entity.getNote())
                .createdAt(entity.getCreatedAt())
                .shippingAddress(
                        ShippingAddressMapper.toResponse(entity.getShippingAddress())
                )
                .items(entity.getItems().stream()
                        .map(OrderItemMapper::toResponse)
                        .collect(Collectors.toList()))
                .build();
    }
}
