package ecommerce.project.dtoresponse;

import lombok.Data;

import java.time.Instant;

@Data
public class ChatMessageResponse {
    private long id;       // ID từ DB
    private String sender;   // từ frontend
    private String content;
    private String messageType;
    private boolean isRead;
    private String sentAt;
    private String clientId;
    private String avatarUrl;
    private String chatRoomId;
    private String status;

    public void setSentAt(Instant instant) {
        this.sentAt = instant.toString(); // ISO 8601, mặc định UTC
    }

}
