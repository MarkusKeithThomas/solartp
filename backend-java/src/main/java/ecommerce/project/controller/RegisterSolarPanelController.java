package ecommerce.project.controller;

import ecommerce.project.baseresponse.BaseResponse;
import ecommerce.project.dtorequest.RegisterSolarPanelRequest;
import ecommerce.project.dtoresponse.RegisterSolarPanelResponse;
import ecommerce.project.service.RegisterSolarPanelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/solar-panel")
public class RegisterSolarPanelController {

    private final RegisterSolarPanelService service;

    @PostMapping("/add-user")
    public ResponseEntity<?> create(@RequestBody RegisterSolarPanelRequest request) {
        RegisterSolarPanelResponse response = service.register(request);
        return ResponseEntity.ok(new BaseResponse(200,"Đã thêm dữ liệu thành công",response));
    }
    @GetMapping
    public ResponseEntity<?> getAllOrderedByNewest() {
        List<RegisterSolarPanelResponse> list = service.getAllOrderedByNewest();
        return ResponseEntity.ok(new BaseResponse(200, "Danh sách đăng ký", list));
    }
}