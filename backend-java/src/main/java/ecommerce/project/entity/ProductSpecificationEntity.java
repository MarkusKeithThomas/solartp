package ecommerce.project.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "product_specification")
@Data
public class ProductSpecificationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_id", nullable = false)
    private Long productId; // Hoặc dùng @ManyToOne nếu cần liên kết entity

    @Column(name = "spec_group")
    private String specGroup;

    private String name;
    private String value;

    @Column(name = "display_order")
    private Integer displayOrder;
}

