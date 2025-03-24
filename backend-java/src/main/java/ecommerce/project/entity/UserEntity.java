package ecommerce.project.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String email;

    private String password;

    private String picture;

    private String name;

    @Column(name = "refresh_token")
    private String refreshToken;

    // Quan hệ với bảng user_info
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_info_id", referencedColumnName = "id")
    private UserInfoEntity userInfo;

    // Quan hệ với bảng roles (có thể nullable)
    @ManyToOne
    @JoinColumn(name = "role_id", referencedColumnName = "id", nullable = true)
    private RoleEntity role; // Tạo sau nếu cần
}
