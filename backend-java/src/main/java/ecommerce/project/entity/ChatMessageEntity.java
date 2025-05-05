package ecommerce.project.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.time.LocalDateTime;

@Entity
@Table(name = "chat_messages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "chat_room_id", nullable = false)
    private String chatRoomId; // Không dùng FK object để tránh circular nếu bạn không cần full ChatRoomEntity

    @Column(name = "sender", nullable = false, length = 255)
    private String sender;

    @Column(name = "content", columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(name = "is_read", nullable = false)
    private Boolean isRead = false;

    @Column(name = "message_type", length = 50, nullable = false)
    private String messageType = "TEXT"; // TEXT, IMAGE, FILE

    @Column(name = "sent_at", nullable = false, updatable = false)
    private Instant sentAt;

    @Column(name = "client_id", length = 255)
    private String clientId;

    @Column(name = "avatar_url", columnDefinition = "TEXT")
    private String avatarUrl;

    @PrePersist
    public void prePersist() {
        if (sentAt == null) {
            sentAt = Instant.now();
        }
        if (isRead == null) {
            isRead = false;
        }
        if (messageType == null) {
            messageType = "TEXT";
        }
    }
}