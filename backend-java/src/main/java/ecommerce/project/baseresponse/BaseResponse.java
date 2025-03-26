package ecommerce.project.baseresponse;

import ecommerce.project.dto.ProductDTO;
import lombok.Data;

@Data
public class BaseResponse {
    private int code;
    private String message;
    private Object data;
    public BaseResponse() {}

    public BaseResponse(int code, String message , Object data) {
        this.code = code;
        this.data = data;
        this.message = message;
    }
}
