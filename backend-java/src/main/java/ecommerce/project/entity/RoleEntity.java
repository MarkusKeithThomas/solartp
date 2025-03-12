package ecommerce.project.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity(name = "roles")
public class RoleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "role")
    private String role;

    @Column(name = "name")
    private String name;
}
