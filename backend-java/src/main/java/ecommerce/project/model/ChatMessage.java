package ecommerce.project.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {
    private String chatRoomId;
    private String sender;
    private String content;
    private String timestamp;
}
