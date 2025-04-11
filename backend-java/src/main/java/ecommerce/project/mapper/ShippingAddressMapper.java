package ecommerce.project.mapper;

import ecommerce.project.dtorequest.ShippingAddressRequest;
import ecommerce.project.dtoresponse.ShippingAddressResponse;
import ecommerce.project.entity.OrderEntity;
import ecommerce.project.entity.ShippingAddressEntity;
import ecommerce.project.entity.UserEntity;

public class ShippingAddressMapper {

    public static ShippingAddressResponse toResponse(ShippingAddressEntity entity) {
        return ShippingAddressResponse.builder()
                .fullName(entity.getFullName())
                .email(entity.getEmail())
                .phone(entity.getPhone())
                .addressLine(entity.getAddressLine())
                .province(entity.getProvince())
                .district(entity.getDistrict())
                .ward(entity.getWard())
                .addressNote(entity.getAddressNote())
                .type(entity.getType())
                .build();
    }

    public static ShippingAddressEntity toEntity(ShippingAddressRequest dto, Integer userId, OrderEntity order) {
        return ShippingAddressEntity.builder()
                .fullName(dto.getFullName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .addressLine(dto.getAddressLine())
                .province(dto.getProvince())
                .addressNote(dto.getAddressNote())
                .user(UserEntity.withId(userId)) // static factory method nếu có
                .order(order)
                .build();
    }

}