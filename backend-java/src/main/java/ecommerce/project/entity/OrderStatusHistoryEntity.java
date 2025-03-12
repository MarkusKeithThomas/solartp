package ecommerce.project.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity(name = "order_status_history")
public class OrderStatusHistoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "date")
    private Date date;
    @Column(name = "status")
    private String status;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private OrderEntity order;
}
