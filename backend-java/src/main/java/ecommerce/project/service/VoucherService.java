package ecommerce.project.service;

import ecommerce.project.dtorequest.VoucherCreateRequest;
import ecommerce.project.dtorequest.VoucherUpdateRequest;
import ecommerce.project.dtoresponse.VoucherResponse;
import ecommerce.project.entity.VoucherEntity;

import java.math.BigDecimal;
import java.util.List;

public interface VoucherService {
    VoucherResponse validate(String codeInput, BigDecimal orderTotal);
    VoucherEntity create(VoucherCreateRequest request);
    VoucherEntity update(Long id, VoucherUpdateRequest request);
    List<VoucherResponse> getListVoucher();
    VoucherResponse getVoucherById(int id);

}
