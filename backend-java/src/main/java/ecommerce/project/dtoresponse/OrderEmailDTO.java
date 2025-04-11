package ecommerce.project.dtoresponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderEmailDTO implements Serializable {
    private String customerName;
    private String customerEmail;
    private String orderCode;
    private BigDecimal totalAmount;
}