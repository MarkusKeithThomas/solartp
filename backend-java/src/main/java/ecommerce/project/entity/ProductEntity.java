package ecommerce.project.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "product")
@Data
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "sku_product", nullable = false, unique = true)
    private String skuProduct;

    @Column(nullable = false)
    private String name;

    private String slug;
    private String description;

    @Column(name = "new_price", precision = 10, scale = 1)
    private BigDecimal newPrice;

    @Column(name = "old_price", precision = 10, scale = 1)
    private BigDecimal oldPrice;

    @Column(name = "category_id")
    private Long categoryId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", insertable = false, updatable = false)
    private CategoryEntity category;

    @Column(name = "stock_quantity")
    private Integer stockQuantity;

    @Column(name = "sold_quantity")
    private int soldQuantity;

    private String wattage;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Column(name = "note")
    private String note;

    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;
}
