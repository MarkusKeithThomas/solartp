package ecommerce.project.dtorequest;

import ecommerce.project.model.PaymentMethod;
import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {
    private int userId; // Có thể null nếu chưa đăng nhập
    private Long cartId;
    private String voucherCode; // Có thể null
    private String unit;
    private String note;
    private PaymentMethod paymentMethod; // COD, VNPAY, MOMO
    private ShippingAddressRequest shippingAddress;
    private List<OrderItemRequest> orderItems;
}