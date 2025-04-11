package ecommerce.project.mapper;

import ecommerce.project.dtoresponse.OrderItemResponse;
import ecommerce.project.entity.OrderItemEntity;

public class OrderItemMapper {

    public static OrderItemResponse toResponse(OrderItemEntity entity) {
        return OrderItemResponse.builder()
                .productSku(entity.getProductSku())
                .productName(entity.getProductName())
                .thumbnailUrl(entity.getThumbnailUrl())
                .unit(entity.getUnit())
                .quantity(entity.getQuantity())
                .price(entity.getPrice())
                .totalPrice(entity.getTotalPrice())
                .build();
    }
}