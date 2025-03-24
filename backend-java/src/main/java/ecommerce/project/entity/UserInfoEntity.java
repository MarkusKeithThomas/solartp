package ecommerce.project.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

    @Entity
    @Table(name = "user_info")
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public class UserInfoEntity {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;

        @Column(name = "full_name")
        private String fullName;

        private String gender;

        private Timestamp birthday;

        private String address;

        private String phone;

        private String description;

        private String image;
    }

