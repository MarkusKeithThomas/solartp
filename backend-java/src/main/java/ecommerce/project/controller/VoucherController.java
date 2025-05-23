package ecommerce.project.controller;


import ecommerce.project.baseresponse.BaseResponse;
import ecommerce.project.dtorequest.VoucherCreateRequest;
import ecommerce.project.dtorequest.VoucherUpdateRequest;
import ecommerce.project.dtoresponse.VoucherResponse;
import ecommerce.project.entity.VoucherEntity;
import ecommerce.project.service.VoucherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/vouchers")
@RequiredArgsConstructor
public class VoucherController {

    private final VoucherService voucherService;

    @PostMapping("/add")
    public ResponseEntity<?> addVoucher(@RequestBody VoucherCreateRequest request) {
        VoucherEntity saved = voucherService.create(request);
        return ResponseEntity.ok(new BaseResponse(200,"Đã thêm voucher thành công", saved));
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateVoucher(
            @RequestParam String code,
            @RequestParam BigDecimal orderTotal) {
        VoucherResponse result = voucherService.validate(code, orderTotal);
        return ResponseEntity.ok(new BaseResponse(200,"Thông tin mã giảm giá", result));
    }
    @PutMapping("/id/{id}")
    public ResponseEntity<?> updateVoucher(
            @PathVariable Long id,
            @RequestBody VoucherUpdateRequest request) {
        VoucherEntity updated = voucherService.update(id, request);
        return ResponseEntity.ok(new BaseResponse(200,"Cập nhật voucher thành công", updated));
    }

    @GetMapping("/get-list-voucher")
    public ResponseEntity<?> getListVoucher(){
        List<VoucherResponse> list = voucherService.getListVoucher();
        return ResponseEntity.ok(new BaseResponse(200,"Danh sách voucher",list));
    }

    @GetMapping("/get-voucher-id")
    public ResponseEntity<?> getVoucherById(@RequestParam(name = "id") int id){
        VoucherResponse voucherResponse = voucherService.getVoucherById(id);
        return ResponseEntity.ok(new BaseResponse(200,"Voucher bạn đã lấy thành công",voucherResponse));

    }

}