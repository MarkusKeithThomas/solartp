package com.cybersoft.ecommerce.exception;

import com.cybersoft.ecommerce.response.BaseResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class CentralException {
    @ExceptionHandler({InsertException.class})
    public ResponseEntity<?> centralLog(Exception e) {
        BaseResponse response = new BaseResponse();
        response.setCode(300);
        response.setMessage(e.getMessage());
        return ResponseEntity.internalServerError().body(response);
    }

    @ExceptionHandler({FileUploadException.class})
    public ResponseEntity<?> centralLogFileUpload(Exception e) {
        BaseResponse response = new BaseResponse();
        response.setCode(300);
        response.setMessage(e.getMessage());
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler({LoginException.class})
    public  ResponseEntity<?> centralLogin(Exception e){
        BaseResponse response = new BaseResponse();
        response.setMessage(e.getMessage());
        response.setCode(300);
        response.setData("Đăng Nhập Thất Bại!!!");
        return ResponseEntity.internalServerError().body(response);
    }
    @ExceptionHandler({RegisterException.class})
    public ResponseEntity<?> centralRegisterException(Exception e){
        BaseResponse response = new BaseResponse();
        response.setMessage("Đăng kí thất bại");
        response.setCode(500);
        response.setData(e.getMessage());
        return ResponseEntity.internalServerError().body(response);
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<BaseResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );
        BaseResponse response = new BaseResponse();
        response.setCode(400); // ❌ Lỗi dữ liệu nhập sai
        response.setMessage("Lỗi validation");
        response.setData(errors);

        return ResponseEntity.badRequest().body(response); // ✅ Trả lỗi theo chuẩn BaseResponse
    }
}
