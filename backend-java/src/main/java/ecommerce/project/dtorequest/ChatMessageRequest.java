package ecommerce.project.dtorequest;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO từ client gửi tin nhắn vào WebSocket endpoint /app/chat.send
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageRequest {

    @NotBlank(message = "Chat room ID không được để trống")
    private String chatRoomId;

    @NotBlank(message = "Người gửi không được để trống")
    @Size(min = 3, max = 50, message = "Tên người gửi từ 3 đến 50 ký tự")
    private String sender;

    @NotBlank(message = "Người gửi không được để trống Phone")
    @Size(min = 3, max = 20, message = "Phone gửi từ 3 đến 20 ký tự")
    private String phone;

    @NotBlank(message = "Nội dung không được để trống")
    @Size(max = 1000, message = "Tin nhắn tối đa 1000 ký tự")
    private String content;


    private String clientId; // UUID tạo ở client để sync trạng thái (optional)

    private String messageType = "TEXT"; // TEXT, IMAGE, FILE (mặc định TEXT)
}
