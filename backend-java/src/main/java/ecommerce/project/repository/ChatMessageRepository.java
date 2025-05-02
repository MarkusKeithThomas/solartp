package ecommerce.project.repository;

import ecommerce.project.entity.ChatMessageEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessageEntity,Integer> {
    ChatMessageEntity findTopByChatRoomIdOrderBySentAtDesc(String chatRoomId);
    Page<ChatMessageEntity> findByChatRoomIdOrderBySentAtDesc(String chatRoomId, Pageable pageable);
}
