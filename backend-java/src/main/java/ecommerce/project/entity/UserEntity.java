package ecommerce.project.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity(name = "users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;
    //Sua sao
    @Column(name = "picture")
    private String picture;

    @Column(name = "name")
    private String name;
    @Column(name = "refresh_token")
    private String refreshToken;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private RoleEntity role;

    @OneToOne
    @JoinColumn(name = "user_info_id")
    private UserInfoEntity userInfo;
}
