package ecommerce.project.baseresponse;

import lombok.Data;

@Data
public class BaseResponse {
    private int code;
    private String message;
    private Object data;

}
