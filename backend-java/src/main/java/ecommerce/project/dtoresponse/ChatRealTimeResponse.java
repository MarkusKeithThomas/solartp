package ecommerce.project.dtoresponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO trả về cho frontend khi gửi lại tin nhắn từ WebSocket
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatRealTimeResponse {

    private String id;             // ID trong database
    private String chatRoomId;     // Mã phòng chat
    private String sender;         // Người gửi
    private String content;        // Nội dung
    private String timestamp;      // ISO string hoặc yyyy-MM-dd HH:mm
    private String avatarUrl;      // Link ảnh đại diện nếu có
    private String clientId;       // UUID phía client gửi lên để sync trạng thái
    private String messageType;    // TEXT, IMAGE, FILE
}
