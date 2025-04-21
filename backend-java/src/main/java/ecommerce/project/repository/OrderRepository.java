package ecommerce.project.repository;

import ecommerce.project.entity.OrderEntity;
import ecommerce.project.model.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {

    Optional<OrderEntity> findByIdAndUserId(Long orderId, Long userId);

    Page<OrderEntity> findAllByUserId(Long userId, Pageable pageable);

    @Query("""
    SELECT o FROM OrderEntity o 
    WHERE o.shippingAddress.phone = :phone 
    AND o.status IN (
        ecommerce.project.model.OrderStatus.PLACED,
        ecommerce.project.model.OrderStatus.CONFIRMED,
        ecommerce.project.model.OrderStatus.WAITING_FOR_PICKUP,
        ecommerce.project.model.OrderStatus.DELIVERING,
        ecommerce.project.model.OrderStatus.CANCELED
    )
""")
    List<OrderEntity> findUnfinishedOrdersByPhone(@Param("phone") String phone);

    @Query("SELECT o FROM OrderEntity o " +
            "WHERE (:keyword IS NULL OR o.orderCode LIKE %:keyword%) " +
            "AND (:status IS NULL OR o.status = :status) " +
            "AND (:from IS NULL OR o.createdAt >= :from) " +
            "AND (:to IS NULL OR o.createdAt <= :to)")
    Page<OrderEntity> searchOrders(@Param("keyword") String keyword,
                                   @Param("status") OrderStatus status,
                                   @Param("from") LocalDateTime from,
                                   @Param("to") LocalDateTime to,
                                   Pageable pageable);

    @Query("SELECT o FROM OrderEntity o ORDER BY o.createdAt DESC")
    List<OrderEntity> findTopNByOrderByCreatedAtDesc(Pageable pageable);

    default List<OrderEntity> findTopNByOrderByCreatedAtDesc(int limit) {
        return findTopNByOrderByCreatedAtDesc(PageRequest.of(0, limit));
    }
}