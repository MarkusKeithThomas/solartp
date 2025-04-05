package ecommerce.project.repository;

import ecommerce.project.entity.ChatEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRepository extends JpaRepository<ChatEntity, Long> {

    // Lấy tất cả tin nhắn theo roomId, mới nhất trước
    List<ChatEntity> findByChatRoomIdOrderByTimestampAsc(String chatRoomId);

    // Lấy tin nhắn theo roomId và người gửi
    List<ChatEntity> findByChatRoomIdAndSenderOrderByTimestampAsc(String chatRoomId, String sender);

    // 1. Trả về danh sách các chatRoomId liên quan tới user (dùng sender)
    @Query("SELECT DISTINCT c.chatRoomId FROM ChatEntity c WHERE c.sender = :userId")
    List<String> findChatRoomIdsByUser(long userId);

    // 2. Tìm tin nhắn chưa đọc trong 1 phòng mà người đọc chưa phải người gửi
    @Query("SELECT c FROM ChatEntity c WHERE c.chatRoomId = :chatRoomId AND c.sender <> :reader AND c.isRead = false")
    List<ChatEntity> findUnreadMessages(String chatRoomId, String reader);

    // 3. Đếm tin nhắn chưa đọc trong room, không phải do receiver gửi
    int countByChatRoomIdAndSenderNotAndIsReadFalse(String chatRoomId, String receiver);

    Page<ChatEntity> findByChatRoomId(String roomId, Pageable pageable);
    Optional<ChatEntity> findByClientId(String clientId);

}
