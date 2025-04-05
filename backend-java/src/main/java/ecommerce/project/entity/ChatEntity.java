package ecommerce.project.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "chat_messages")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "client_id", unique = true, nullable = false)
    private String clientId; // ID duy nhất cho frontend sinh ra

    @Column(name = "chat_room_id", nullable = false)
    private String chatRoomId;

    @Column(nullable = false)
    private String sender;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "sent_at", nullable = false)
    private Instant timestamp;

    @Column(name = "is_read", nullable = false)
    private boolean isRead = false;

    @Column(name = "sender_ip")
    private String senderIp; // dùng khi muốn log IP

    @Column(name = "message_type")
    private String messageType = "TEXT"; // hoặc IMAGE, FILE, SYSTEM...
}
