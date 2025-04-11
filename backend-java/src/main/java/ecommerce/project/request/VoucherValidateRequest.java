package ecommerce.project.request;

import java.math.BigDecimal;

public record VoucherValidateRequest(
        String code,
        BigDecimal orderTotal)
{}

