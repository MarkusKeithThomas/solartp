package ecommerce.project.dtoresponse;

import lombok.Data;


// ChatResponseDTO.java
@Data
public class ChatResponseDTO {
    private String id;         // ID từ DB
    private String clientId;   // từ frontend
    private String chatRoomId;
    private String sender;
    private String content;
    private String timestamp;
    private String avatarUrl;
}
