package ecommerce.project.mapper;
import ecommerce.project.dtorequest.RegisterSolarPanelRequest;
import ecommerce.project.dtoresponse.RegisterSolarPanelResponse;
import ecommerce.project.entity.RegisterSolarPanelEntity;

import java.time.format.DateTimeFormatter;

public class RegisterSolarPanelMapper {

    public static RegisterSolarPanelEntity toEntity(RegisterSolarPanelRequest dto) {
        return RegisterSolarPanelEntity.builder()
                .fullName(dto.getFullName())
                .phone(dto.getPhone())
                .address(dto.getAddress())
                .financialRange(dto.getFinancialRange())
                .customAmount(dto.getCustomAmount())
                .build();
    }

    public static RegisterSolarPanelResponse toResponse(RegisterSolarPanelEntity entity) {
        return RegisterSolarPanelResponse.builder()
                .id(entity.getId())
                .fullName(entity.getFullName())
                .phone(entity.getPhone())
                .address(entity.getAddress())
                .financialRange(entity.getFinancialRange())
                .customAmount(entity.getCustomAmount())
                .createdAt(entity.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .build();
    }
}
