package ecommerce.project.service;

import ecommerce.project.baseresponse.CustomPageResponse;
import ecommerce.project.dtorequest.ChatRequestDTO;
import ecommerce.project.dtoresponse.ChatResponseDTO;
import ecommerce.project.entity.ChatEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ChatService {

    /**
     * Lưu tin nhắn từ client gửi lên
     */
    ChatEntity saveMessage(ChatRequestDTO request, String ipAddress);

    /**
     * Gửi tin nhắn realtime qua WebSocket đến người nhận
     */
    void sendMessageToRoom(ChatEntity message);

    /**
     * Lấy lịch sử chat theo roomId
     */
    List<ChatResponseDTO> getMessagesByRoomId(String chatRoomId);

    /**
     * Lấy toàn bộ danh sách người đã từng nhắn tin với seller/buyer (dùng cho sidebar chat)
     */
    List<String> getChatRoomIdsByUser(Long userId);

    /**
     * Tạo room chat nếu chưa có (giữa buyer và seller)
     */
    String createOrGetChatRoom(long buyerId, long sellerId);

    /**
     * Đánh dấu tất cả tin nhắn trong room là đã đọc
     */
    void markMessagesAsRead(String chatRoomId, String reader);

    /**
     * Đếm số tin nhắn chưa đọc theo room cho 1 người dùng
     */
    int countUnreadMessages(String chatRoomId, String receiver);

    /**
     * Chuyển từ Entity sang ResponseDTO
     */
    ChatResponseDTO toResponseDTO(ChatEntity entity);

    /**
     * Phân trang tin nhắn
     */
    CustomPageResponse<ChatResponseDTO> getPagedMessages(String roomId, Pageable pageable);
}