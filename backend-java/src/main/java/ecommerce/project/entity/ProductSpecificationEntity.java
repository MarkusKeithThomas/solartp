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

    @ManyToOne
    @JoinColumn(name = "product_id")
    private ProductEntity product;

    @Column(name = "spec_group")
    private String specGroup;

    private String name;
    private String value;

    @Column(name = "display_order")
    private Integer displayOrder = 0;
}

