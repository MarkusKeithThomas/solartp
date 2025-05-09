package ecommerce.project.model;

public enum StockCheckResult {
    NOT_FOUND, // Không có trong Redis
    NOT_ENOUGH, // Có nhưng không đủ
    ENOUGH // Đủ hàng
}
