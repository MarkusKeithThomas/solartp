package ecommerce.project.exception;

import lombok.Data;

public class GoogleLoginException extends RuntimeException{
    public GoogleLoginException(String message) {
        super(message);
    }
}
