package ecommerce.project.exception;

import ecommerce.project.baseresponse.BaseResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

@ControllerAdvice
public class CentralException {

    private static final Logger LOGGER = Logger.getLogger(CentralException.class.getName());

    // 🛑 Xử lý lỗi InsertException (Lỗi khi thêm dữ liệu vào database)
    @ExceptionHandler({InsertException.class})
    public ResponseEntity<BaseResponse> handleInsertException(Exception e) {
        LOGGER.log(Level.SEVERE, "InsertException: " + e.getMessage(), e);
        return buildErrorResponse(500, "Lỗi khi thêm dữ liệu!", e);
    }

    // 🛑 Xử lý lỗi khi upload file thất bại
    @ExceptionHandler({FileUploadException.class})
    public ResponseEntity<BaseResponse> handleFileUploadException(Exception e) {
        LOGGER.log(Level.WARNING, "FileUploadException: " + e.getMessage(), e);
        return buildErrorResponse(400, "Lỗi khi upload file!", e);
    }

    // 🛑 Xử lý lỗi đăng nhập thất bại
    @ExceptionHandler({LoginException.class})
    public ResponseEntity<BaseResponse> handleLoginException(Exception e) {
        LOGGER.log(Level.WARNING, "LoginException: " + e.getMessage(), e);
        return buildErrorResponse(401, "Đăng nhập thất bại!", e);
    }

    // 🛑 Xử lý lỗi đăng ký thất bại
    @ExceptionHandler({RegisterException.class})
    public ResponseEntity<BaseResponse> handleRegisterException(Exception e) {
        LOGGER.log(Level.WARNING, "RegisterException: " + e.getMessage(), e);
        return buildErrorResponse(400, "Đăng ký thất bại!", e);
    }

    // 🛑 Xử lý lỗi validation dữ liệu đầu vào (ví dụ: email không hợp lệ, password quá ngắn, ...)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<BaseResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
        LOGGER.log(Level.WARNING, "Validation Error: " + ex.getMessage(), ex);

        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );

        BaseResponse response = new BaseResponse();
        response.setCode(400);
        response.setMessage("Lỗi validation!");
        response.setData(errors);

        return ResponseEntity.badRequest().body(response);
    }

    // 🛑 Xử lý lỗi đăng nhập Google thất bại
    @ExceptionHandler({GoogleLoginException.class})
    public ResponseEntity<BaseResponse> handleGoogleLoginException(Exception e) {
        LOGGER.log(Level.WARNING, "GoogleLoginException: " + e.getMessage(), e);
        return buildErrorResponse(401, "Đăng nhập Google thất bại!", e);
    }

    // 🛑 Xử lý lỗi khi refresh token thất bại
    @ExceptionHandler({RefreshException.class})
    public ResponseEntity<BaseResponse> handleRefreshException(Exception e) {
        LOGGER.log(Level.WARNING, "RefreshException: " + e.getMessage(), e);
        return buildErrorResponse(400, "Lỗi Refresh Token!", e);
    }

    // 🛑 Xử lý lỗi khi logout thất bại
    @ExceptionHandler({LogoutException.class})
    public ResponseEntity<BaseResponse> handleLogoutException(Exception e) {
        LOGGER.log(Level.WARNING, "LogoutException: " + e.getMessage(), e);
        return buildErrorResponse(400, "Lỗi khi đăng xuất!", e);
    }
    // 🛑 Xử lý lỗi khi logout thất bại
    @ExceptionHandler({GetInfoException.class})
    public ResponseEntity<BaseResponse> handleGetInfoException(Exception e) {
        LOGGER.log(Level.WARNING, "GetInfo: " + e.getMessage(), e);
        return buildErrorResponse(400, "Lỗi khi lấy dữ liệu!", e);
    }
    // 🛑 Xử lý lỗi khi quen password thất bại
    @ExceptionHandler({ForgotPassWordException.class})
    public ResponseEntity<BaseResponse> handleForgotPassWordException(Exception e) {
        LOGGER.log(Level.WARNING, "GetInfo: " + e.getMessage(), e);
        return buildErrorResponse(400, "Lỗi khi re-set password!", e);
    }

    // 🛑 Xử lý lỗi khi upload csv thất bại
    @ExceptionHandler({UploadExcelException.class})
    public ResponseEntity<BaseResponse> handleUploadExcelException(Exception e) {
        LOGGER.log(Level.WARNING, "GetInfo: " + e.getMessage(), e);
        return buildErrorResponse(400, "Truy cập bị từ chối.", e);
    }

    // 🛑 Xử lý lỗi khi upload anh loi thất bại
    @ExceptionHandler({UploadFileToCloudFlareException.class})
    public ResponseEntity<BaseResponse> handleUploadFileToCloudFlareException(Exception e) {
        LOGGER.log(Level.WARNING, "GetInfo: " + e.getMessage(), e);
        return buildErrorResponse(400, "Upload bị lỗi.", e);
    }
    // 🛑 Xử lý lỗi khi upload anh loi thất bại
    @ExceptionHandler({ArticleGetException.class})
    public ResponseEntity<BaseResponse> handleArticleGetException(Exception e) {
        LOGGER.log(Level.WARNING, "GetInfo: " + e.getMessage(), e);
        return buildErrorResponse(400, "Lấy bài viết bị lỗi.", e);
    }

    // 🛑 Xử lý tất cả các lỗi chưa được định nghĩa phía trên
    @ExceptionHandler(Exception.class)
    public ResponseEntity<BaseResponse> handleGlobalException(Exception e) {
        LOGGER.log(Level.SEVERE, "Unhandled Exception: " + e.getMessage(), e);
        return buildErrorResponse(500, "Lỗi hệ thống! Vui lòng thử lại sau.", e);
    }
    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<BaseResponse> handleProductNotFound(ProductNotFoundException ex) {
        return ResponseEntity.status(404).body(new BaseResponse(404, ex.getMessage(), null));
    }

    @ExceptionHandler(CategoryNotFoundException.class)
    public ResponseEntity<BaseResponse> handleCategoryNotFound(CategoryNotFoundException ex) {
        return ResponseEntity.status(404).body(new BaseResponse(404, ex.getMessage(), null));
    }
    @ExceptionHandler(DeleteProductException.class)
    public ResponseEntity<BaseResponse> handleDeleteProductNotFound(Exception ex) {
        return ResponseEntity.status(404).body(new BaseResponse(404, ex.getMessage(), null));
    }
    @ExceptionHandler(StockException.class)
    public ResponseEntity<BaseResponse> handleStockException(Exception ex) {
        return ResponseEntity.status(404).body(new BaseResponse(404, ex.getMessage(), null));
    }
    @ExceptionHandler(ChattingException.class)
    public ResponseEntity<BaseResponse> handleChattingException(Exception ex) {
        return ResponseEntity.status(403).body(new BaseResponse(403, ex.getMessage(), null));
    }

    @ExceptionHandler(VoucherException.class)
    public ResponseEntity<BaseResponse> handleVoucherException(Exception ex) {
        return ResponseEntity.status(400).body(new BaseResponse(400, ex.getMessage(), null));
    }

    @ExceptionHandler(ProductSpecificationException.class)
    public ResponseEntity<BaseResponse> handleProductSpecificationException(Exception ex) {
        return ResponseEntity.status(400).body(new BaseResponse(400, ex.getMessage(), null));
    }

    @ExceptionHandler(SaveChatToDBException.class)
    public ResponseEntity<BaseResponse> handleSaveChatToDBException(Exception ex){
        return ResponseEntity.status(400).body(new BaseResponse(400, ex.getMessage(), null));
    }

    /**
     * Hàm build BaseResponse chuẩn hóa phản hồi lỗi
     */
    private ResponseEntity<BaseResponse> buildErrorResponse(int statusCode, String message, Exception e) {
        BaseResponse response = new BaseResponse();
        response.setCode(statusCode);
        response.setMessage(message);
        response.setData(e.getMessage());
        return ResponseEntity.status(statusCode).body(response);
    }
}