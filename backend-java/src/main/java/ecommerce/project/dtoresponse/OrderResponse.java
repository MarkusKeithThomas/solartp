package ecommerce.project.dtoresponse;

import ecommerce.project.model.OrderStatus;
import ecommerce.project.model.PaymentMethod;
import ecommerce.project.model.PaymentStatus;
import lombok.Builder;
import lombok.Data;

import com.fasterxml.jackson.annotation.JsonFormat;


import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class OrderResponse {
    private Long id;
    private String orderCode;
    private BigDecimal totalAmount;
    private BigDecimal discountAmount;
    private BigDecimal finalAmount;

    private PaymentMethod paymentMethod;
    private PaymentStatus paymentStatus;
    private OrderStatus status;

    private String note;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;
    private ShippingAddressResponse shippingAddress;
    private List<OrderItemResponse> items;
}